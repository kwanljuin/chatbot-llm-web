import { create } from "zustand";
import type {
  ChatState,
  ChatSession,
  Message,
  UserPreferences,
} from "@/types/chat";

const STORAGE_KEY = "chatbot-data";

const defaultPreferences: UserPreferences = {
  theme: "light",
  autoScroll: true,
};

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  isStreaming: false,
  error: null,
  userPreferences: defaultPreferences,

  createNewSession: () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };

    set((state) => ({
      sessions: [newSession, ...state.sessions],
      currentSessionId: newSession.id,
      error: null,
    }));

    get().saveToStorage();
    return newSession.id;
  },

  loadSession: (sessionId: string) => {
    set({ currentSessionId: sessionId, error: null });
  },

  addMessage: (
    sessionId: string,
    message: Omit<Message, "id" | "timestamp"> | (Message & { id: string })
  ) => {
    const newMessage: Message =
      "id" in message
        ? {
            ...message,
            timestamp: message.timestamp || new Date(),
          }
        : {
            ...message,
            id: crypto.randomUUID(),
            timestamp: new Date(),
          };

    set((state) => ({
      sessions: state.sessions.map((session) => {
        if (session.id === sessionId) {
          const updatedSession = {
            ...session,
            messages: [...session.messages, newMessage],
            updatedAt: new Date(),
            title:
              session.messages.length === 0 && message.role === "user"
                ? message.content.slice(0, 50) +
                  (message.content.length > 50 ? "..." : "")
                : session.title,
          };
          return updatedSession;
        }
        return session;
      }),
    }));

    get().saveToStorage();
  },

  updateStreamingMessage: (
    sessionId: string,
    messageId: string,
    content: string
  ) => {
    set((state) => ({
      sessions: state.sessions.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: session.messages.map((msg) =>
              msg.id === messageId
                ? { ...msg, content, isStreaming: true }
                : msg
            ),
            updatedAt: new Date(),
          };
        }
        return session;
      }),
    }));
  },

  deleteSession: (sessionId: string) => {
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSessionId:
        state.currentSessionId === sessionId ? null : state.currentSessionId,
    }));
    get().saveToStorage();
  },

  setStreaming: (isStreaming: boolean) => {
    set({ isStreaming });
    if (!isStreaming) {
      // Mark all streaming messages as complete
      set((state) => ({
        sessions: state.sessions.map((session) => ({
          ...session,
          messages: session.messages.map((msg) => ({
            ...msg,
            isStreaming: false,
          })),
        })),
      }));
      get().saveToStorage();
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  updatePreferences: (preferences: Partial<UserPreferences>) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    }));
    get().saveToStorage();
  },

  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        set({
          sessions:
            data.sessions?.map((session: any) => ({
              ...session,
              createdAt: new Date(session.createdAt),
              updatedAt: new Date(session.updatedAt),
              messages: session.messages.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
              })),
            })) || [],
          currentSessionId: data.currentSessionId,
          userPreferences: { ...defaultPreferences, ...data.userPreferences },
        });
      }
    } catch (error) {
      console.error("Failed to load from storage:", error);
    }
  },

  saveToStorage: () => {
    try {
      const state = get();
      const dataToStore = {
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
        userPreferences: state.userPreferences,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Failed to save to storage:", error);
    }
  },
}));
