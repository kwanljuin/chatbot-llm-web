export interface StreamResponse {
  content?: string;
  error?: string;
}

export class ChatAPI {
  private controller: AbortController | null = null;

  async sendMessage(
    messages: Array<{ role: string; content: string }>,
    onChunk: (content: string) => void,
    onComplete: () => void,
    onError: (error: string) => void
  ): Promise<void> {
    this.controller = new AbortController();

    try {
      console.log("Sending chat request...", { messageCount: messages.length });

      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
        signal: this.controller.signal,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        // Try to get error details from response
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If we can't parse the error response, use the status
          switch (response.status) {
            case 401:
              errorMessage =
                "Invalid API key. Please check your configuration.";
              break;
            case 429:
              errorMessage = "Rate limit exceeded. Please try again later.";
              break;
            case 500:
              errorMessage = "Server error. Please try again.";
              break;
            case 503:
              errorMessage = "AI service temporarily unavailable.";
              break;
            default:
              errorMessage = `Request failed with status ${response.status}`;
          }
        }

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response stream available");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      console.log("Starting to read stream...");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("Stream completed");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();

            if (data === "[DONE]") {
              console.log("Received completion signal");
              onComplete();
              return;
            }

            try {
              const parsed: StreamResponse = JSON.parse(data);

              if (parsed.error) {
                console.error("Stream error:", parsed.error);
                onError(parsed.error);
                return;
              }

              if (parsed.content) {
                onChunk(parsed.content);
              }
            } catch (parseError) {
              console.warn("Failed to parse stream data:", data, parseError);
              // Continue processing other chunks
            }
          }
        }
      }

      onComplete();
    } catch (error) {
      console.error("Chat API error:", error);

      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was cancelled");
        return; // Request was cancelled
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      onError(errorMessage);
    } finally {
      this.controller = null;
    }
  }

  cancelRequest(): void {
    if (this.controller) {
      console.log("Cancelling request...");
      this.controller.abort();
      this.controller = null;
    }
  }
}
