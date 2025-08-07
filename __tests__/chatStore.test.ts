import { useChatStore } from "@/store/chatStore";
import { act, renderHook } from "@testing-library/react";

describe("ChatStore", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset store state
    useChatStore.setState({
      sessions: [],
      currentSessionId: null,
      isStreaming: false,
      error: null,
      userPreferences: { theme: "light", autoScroll: true },
    });
  });

  it("should create a new session", () => {
    const { result } = renderHook(() => useChatStore());

    act(() => {
      result.current.createNewSession();
    });

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.currentSessionId).toBe(result.current.sessions[0].id);
  });

  it("should add a message to a session", () => {
    const { result } = renderHook(() => useChatStore());

    let sessionId: string;
    act(() => {
      sessionId = result.current.createNewSession();
      result.current.addMessage(sessionId, {
        role: "user",
        content: "Hello, world!",
      });
    });

    const session = result.current.sessions.find((s) => s.id === sessionId);
    expect(session?.messages).toHaveLength(1);
    expect(session?.messages[0].content).toBe("Hello, world!");
    expect(session?.messages[0].role).toBe("user");
  });

  it("should update session title from first message", () => {
    const { result } = renderHook(() => useChatStore());

    let sessionId: string;
    act(() => {
      sessionId = result.current.createNewSession();
      result.current.addMessage(sessionId, {
        role: "user",
        content: "This is a test message for the title",
      });
    });

    const session = result.current.sessions.find((s) => s.id === sessionId);
    expect(session?.title).toBe("This is a test message for the title");
  });

  it("should delete a session", () => {
    const { result } = renderHook(() => useChatStore());

    let sessionId: string;
    act(() => {
      sessionId = result.current.createNewSession();
      result.current.deleteSession(sessionId);
    });

    expect(result.current.sessions).toHaveLength(0);
    expect(result.current.currentSessionId).toBeNull();
  });
});
