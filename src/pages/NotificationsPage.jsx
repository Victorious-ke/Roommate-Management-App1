import React, { useState } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import "../styles/NotificationCenter.css";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } =
    useNotificationStore();
  const [filter, setFilter] = useState("all");

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <h2>Notification Center</h2>
        <div className="header-actions">
          <button onClick={markAllAsRead} className="action-btn">
            Mark All Read
          </button>
          <button onClick={clearNotifications} className="action-btn danger">
            Clear All
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="filters">
        {["all", "unread", "bills", "chores", "messages", "events"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <p className="empty-msg">No notifications 🎉</p>
      ) : (
        <ul className="notifications-list">
          {filtered.map((notif) => (
            <li
              key={notif.id}
              className={`notification-item ${notif.type} ${
                notif.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              {!notif.read && <span className="dot" />}
              <div>
                <span className="notification-text">{notif.message}</span>
                <span className="notification-time">{notif.time}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
