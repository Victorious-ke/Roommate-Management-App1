import React from 'react';
import { Link } from 'react-router-dom';

const SideBar2 = ({ chores }) => {
const pendingChores = chores.filter(chore => !chore.isCompleted);

return (
<div className="sidebar">
<div className="sidebar-header">
<h2>Dashboard</h2>
</div>
<div className="sidebar-links">
<Link to="/">Home</Link>
<Link to="/chores">
Chores <span className="chore-count">{pendingChores.length}</span>
</Link>
<Link to="/roommates">Roommates</Link>
<Link to="/events">Events</Link>
</div>
</div>
);
};

export default SideBar2;