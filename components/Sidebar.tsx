import { useChatStore } from "@/store/chatStore";

export function Sidebar() {
  const {
    sessions,
    currentSessionId,
    createNewSession,
    loadSession,
    deleteSession,
    userPreferences,
    updatePreferences,
  } = useChatStore();

  const handleNewChat = () => {
    createNewSession();
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteSession(sessionId);
    }
  };

  const toggleTheme = () => {
    const newTheme = userPreferences.theme === "light" ? "dark" : "light";
    updatePreferences({ theme: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="w-64 bg-base-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <button onClick={handleNewChat} className="btn btn-primary w-full">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Chat
        </button>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto p-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-base-300 mb-1 ${
              currentSessionId === session.id ? "bg-base-300" : ""
            }`}
            onClick={() => loadSession(session.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {session.title}
              </div>
              <div className="text-xs text-base-content/60">
                {session.updatedAt.toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={(e) => handleDeleteSession(session.id, e)}
              className="opacity-0 group-hover:opacity-100 btn btn-ghost btn-xs text-error"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Theme</span>
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
            {userPreferences.theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <label className="label cursor-pointer">
          <span className="label-text text-sm">Auto-scroll</span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={userPreferences.autoScroll}
            onChange={(e) =>
              updatePreferences({ autoScroll: e.target.checked })
            }
          />
        </label>
      </div>
    </div>
  );
}
