import { render, screen } from "@testing-library/react";
import { ChatMessage } from "@/components/ChatMessage";
import { Message } from "@/types/chat";

describe("ChatMessage", () => {
  const mockUserMessage: Message = {
    id: "1",
    role: "user",
    content: "Hello, how are you?",
    timestamp: new Date("2025-01-01T12:00:00Z"),
  };

  const mockAssistantMessage: Message = {
    id: "2",
    role: "assistant",
    content: "I am doing well, thank you!",
    timestamp: new Date("2025-01-01T12:01:00Z"),
  };

  it("renders user message correctly", () => {
    render(<ChatMessage message={mockUserMessage} />);

    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("renders assistant message correctly", () => {
    render(<ChatMessage message={mockAssistantMessage} />);

    expect(screen.getByText("I am doing well, thank you!")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("shows streaming indicator for streaming messages", () => {
    const streamingMessage: Message = {
      ...mockAssistantMessage,
      isStreaming: true,
    };

    render(<ChatMessage message={streamingMessage} />);

    expect(screen.getByText("I am doing well, thank you!")).toBeInTheDocument();
    // Check for the streaming cursor
    const streamingCursor = document.querySelector(".animate-pulse");
    expect(streamingCursor).toBeInTheDocument();
  });
});
