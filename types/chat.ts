export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface UserPreferences {
  theme?: "light" | "dark";
  autoScroll: boolean;
}

export interface StoredData {
  sessions: ChatSession[];
  currentSessionId: string | null;
  userPreferences: UserPreferences;
}

export interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isStreaming: boolean;
  error: string | null;
  userPreferences: UserPreferences;

  // Actions
  createNewSession: () => string;
  loadSession: (sessionId: string) => void;
  addMessage: (
    sessionId: string,
    message: Omit<Message, "id" | "timestamp">
  ) => void;
  updateStreamingMessage: (
    sessionId: string,
    messageId: string,
    content: string
  ) => void;
  deleteSession: (sessionId: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  setError: (error: string | null) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}
