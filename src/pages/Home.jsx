import React from "react";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function Home() {
  const { notifications } = useNotificationStore();

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏠 Home</h1>
      <p>Welcome to your app!</p>

      {/* Show notification if there are unread notifications */}
      {unreadCount > 0 ? (
        <p>
          You have <strong>{unreadCount}</strong> new notification
          {unreadCount > 1 ? "s" : ""}.{" "}
          <Link to="/notifications">View Notifications</Link>
        </p>
      ) : (
        <p>
           All caught up! No new notifications.{" "}
          <Link to="/notifications">Open Notification Center</Link>
        </p>
      )}
    </div>
  );
}
