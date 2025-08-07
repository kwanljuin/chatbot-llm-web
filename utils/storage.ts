export const getStorageQuota = (): { used: number; available: number } => {
  if (
    typeof navigator !== "undefined" &&
    "storage" in navigator &&
    "estimate" in navigator.storage
  ) {
    // This is async but we'll provide a fallback
    return { used: 0, available: Infinity };
  }

  // Fallback estimation
  const testKey = "storage-test";
  const testValue = "1".repeat(1024); // 1KB
  let used = 0;

  try {
    for (let i = 0; i < 5000; i++) {
      // Test up to 5MB
      localStorage.setItem(`${testKey}-${i}`, testValue);
      used += 1024;
    }
  } catch (e) {
    // Clean up test data
    for (let i = 0; i < 5000; i++) {
      localStorage.removeItem(`${testKey}-${i}`);
    }
  }

  return { used: 0, available: used };
};

export const cleanupOldSessions = (maxSessions: number = 50): void => {
  try {
    const stored = localStorage.getItem("chatbot-data");
    if (!stored) return;

    const data = JSON.parse(stored);
    if (data.sessions && data.sessions.length > maxSessions) {
      // Keep the most recent sessions
      data.sessions = data.sessions
        .sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, maxSessions);

      localStorage.setItem("chatbot-data", JSON.stringify(data));
    }
  } catch (error) {
    console.error("Failed to cleanup old sessions:", error);
  }
};
