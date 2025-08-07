"use client";

import { useState, useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatAPI } from "@/utils/api";
import { cleanupOldSessions } from "@/utils/storage";

const chatAPI = new ChatAPI();

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
    loadFromStorage,
  } = useChatStore();

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  useEffect(() => {
    loadFromStorage();
    cleanupOldSessions();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      userPreferences.theme || "light"
    );
  }, [userPreferences.theme]);

  // Track unread messages
  useEffect(() => {
    if (!isOpen && currentSession) {
      const assistantMessages = currentSession.messages.filter(
        (m) => m.role === "assistant"
      );
      if (assistantMessages.length > 0) {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [currentSession?.messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const handleSendMessage = async (content: string) => {
    let sessionId = currentSessionId;

    if (!sessionId) {
      sessionId = createNewSession();
    }

    addMessage(sessionId, { role: "user", content });

    const assistantMessageId = crypto.randomUUID();
    addMessage(sessionId, {
      role: "assistant",
      content: "",
      id: assistantMessageId,
    } as any);

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
          setStreaming(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setStreaming(false);
          updateStreamingMessage(
            sessionId!,
            assistantMessageId,
            "Sorry, I encountered an error. Please try again."
          );
        }
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setStreaming(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpen}
          data-chat-trigger // Add this attribute for external triggering
          className="btn btn-primary btn-circle btn-lg shadow-xl hover:shadow-2xl relative"
        >
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {unreadCount > 0 && (
            <div className="badge badge-error badge-sm absolute -top-2 -right-2">
              {unreadCount}
            </div>
          )}
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-base-100 rounded-lg shadow-xl border border-base-300 w-80">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-medium">Customer Support</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(false)}
                className="btn btn-ghost btn-xs"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-xs"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-base-100 rounded-lg shadow-2xl border border-base-300 w-96 h-[500px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-content rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="font-medium">Customer Support</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="btn btn-ghost btn-xs text-primary-content hover:bg-primary-focus"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-ghost btn-xs text-primary-content hover:bg-primary-focus"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentSession ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👋</div>
              <h3 className="font-bold text-lg mb-2">
                Hello! I'm here to help
              </h3>
              <p className="text-sm text-base-content/60 mb-4">
                I can assist you with product information, company details, and
                website navigation.
              </p>
              <button
                onClick={() => createNewSession()}
                className="btn btn-primary btn-sm"
              >
                Start Conversation
              </button>
            </div>
          ) : (
            <>
              {currentSession.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {error && (
                <div className="alert alert-error alert-sm">
                  <svg
                    className="w-4 h-4"
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
                  <span className="text-xs">{error}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        {currentSession && (
          <div className="border-t">
            {isStreaming && (
              <div className="px-4 py-2 bg-warning/10 border-b">
                <div className="flex items-center justify-between">
                  <span className="text-xs">AI is typing...</span>
                  <button
                    onClick={() => chatAPI.cancelRequest()}
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
              placeholder="Ask me about our products or services..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
