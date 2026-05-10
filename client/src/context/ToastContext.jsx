import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500,
    );
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 76,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: "var(--bg)",
              border: "0.5px solid var(--border)",
              borderLeft: `3px solid ${t.type === "error" ? "var(--danger)" : t.type === "info" ? "var(--primary)" : "var(--accent)"}`,
              padding: "11px 18px",
              borderRadius: 10,
              fontSize: 14,
              maxWidth: 340,
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              animation: "slideIn 0.25s ease",
              color: "var(--text)",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
