import React from "react";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../stores/useNotificationStore";

export default function Navbar() {
  const { notifications } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="navbar">
      <h1>Roommate App</h1>
      <ul>
        <li>
          <Link to="/notifications">
            Notifications {unreadCount > 0 && <span>({unreadCount})</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}