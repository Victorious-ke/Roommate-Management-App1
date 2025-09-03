import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
    </aside>
  );
}
