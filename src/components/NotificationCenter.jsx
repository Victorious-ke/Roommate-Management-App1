import React, { useState, useRef, useEffect } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import "../styles/NotificationCenter.css";

export default function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      {/* Bell Icon */}
      <button className="bell-btn" onClick={() => setIsOpen((prev) => !prev)}>
        🔔
        {notifications.some((n) => !n.read) && (
          <span className="badge">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h4>Notifications</h4>
            <div className="header-actions">
              <button onClick={markAllAsRead} className="action-btn">Mark All Read</button>
              <button onClick={clearNotifications} className="action-btn danger">Clear</button>
            </div>
          </div>

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
          {filteredNotifications.length === 0 ? (
            <p className="empty-msg">No notifications 🎉</p>
          ) : (
            <ul className="notification-list">
              {filteredNotifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`notification-item ${notif.type} ${notif.read ? "read" : "unread"}`}
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
      )}
    </div>
  );
}
