import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
              isUser ? "bg-primary" : "bg-secondary"
            }`}
          >
            {isUser ? "U" : "AI"}
          </div>
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isUser ? "chat-bubble-primary" : "chat-bubble-secondary"
        } max-w-xs sm:max-w-md lg:max-w-lg`}
      >
        <div className="whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming && (
            <span className="inline-block w-2 h-5 bg-current opacity-75 animate-pulse ml-1" />
          )}
        </div>
      </div>
      <div className="chat-footer opacity-50 text-xs">
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
