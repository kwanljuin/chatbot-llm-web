import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatAPI } from "@/utils/api";

const chatAPI = new ChatAPI();

export function ChatWindow() {
  const {
    sessions,
    currentSessionId,
    isStreaming,
    error,
    userPreferences,
    addMessage,
    updateStreamingMessage,
    setStreaming,
    setError,
    createNewSession,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Auto-scroll to bottom
  useEffect(() => {
    if (userPreferences.autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession?.messages, userPreferences.autoScroll]);

  const handleSendMessage = async (content: string) => {
    let sessionId = currentSessionId;

    // Create new session if none exists
    if (!sessionId) {
      sessionId = createNewSession();
    }

    // Add user message
    addMessage(sessionId, { role: "user", content });

    // Create assistant message placeholder
    const assistantMessageId = crypto.randomUUID();
    addMessage(sessionId, {
      role: "assistant",
      content: "",
      id: assistantMessageId, // Add the id directly
    } as any); // Use type assertion to bypass the Omit constraint

    setStreaming(true);
    setError(null);

    const currentSession = sessions.find((s) => s.id === sessionId);
    const allMessages = currentSession
      ? [...currentSession.messages.slice(0, -1), { role: "user", content }]
      : [{ role: "user", content }];

    let accumulatedContent = "";

    try {
      await chatAPI.sendMessage(
        allMessages.map((m) => ({ role: m.role, content: m.content })),
        (chunk) => {
          accumulatedContent += chunk;
          updateStreamingMessage(
            sessionId!,
            assistantMessageId,
            accumulatedContent
          );
        },
        () => {
          console.log("Message completed successfully");
          setStreaming(false);
        },
        (errorMessage) => {
          console.error("Chat error:", errorMessage);
          setError(errorMessage);
          setStreaming(false);

          // Update the assistant message with error
          updateStreamingMessage(
            sessionId!,
            assistantMessageId,
            "Sorry, I encountered an error. Please try again."
          );
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setStreaming(false);
    }
  };

  const handleCancelRequest = () => {
    chatAPI.cancelRequest();
    setStreaming(false);
  };

  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Customer Support
          </h2>
          <p className="text-base-content/60 mb-6">
            I can help you with questions about our products, company
            information, and website navigation.
          </p>
          <button
            onClick={() => createNewSession()}
            className="btn btn-primary"
          >
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {error && (
          <div className="alert alert-error">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative">
        {isStreaming && (
          <div className="absolute top-0 left-0 right-0 p-2 bg-warning/10 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm">AI is typing...</span>
              <button
                onClick={handleCancelRequest}
                className="btn btn-ghost btn-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isStreaming}
          placeholder="Ask me about our products, company, or how to navigate the website..."
        />
      </div>
    </div>
  );
}
