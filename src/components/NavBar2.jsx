import React from "react";
import { Link } from "react-router-dom";

const NavBar2 = ({ user, onLogout, toggleTheme }) => {
return (
<nav className="navbar">
<span>Roommate Management App</span>
{user && (
<div className="user-info">
<span>Welcome, {user.name}</span>
<button onClick={toggleTheme} className="theme-toggle-button">
Toggle Theme
</button>
<button onClick={onLogout} className="logout-button">
Logout
</button>
</div>
)}
</nav>
);
};

export default NavBar2;