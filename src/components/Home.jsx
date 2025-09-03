import React from 'react';

const Home = ({ chores, roommates, events }) => {
const pendingChores = chores.filter(chore => chore.status === "Pending").length;
const totalRoommates = roommates.length;

// Filter for upcoming events (due in the future)
const upcomingEvents = events.filter(event => new Date(event.date) > new Date());

return (
<div className="home-container">
<h2 className="page-title">Dashboard</h2>
<div className="dashboard-grid">
<div className="dashboard-card">
<h3>Pending Chores</h3>
<p>{pendingChores}</p>
</div>
<div className="dashboard-card">
<h3>Total Roommates</h3>
<p>{totalRoommates}</p>
</div>
{/* New: Upcoming Events Card */}
<div className="dashboard-card">
<h3>Upcoming Events</h3>
{upcomingEvents.length > 0 ? (
<ul>
{upcomingEvents.map(event => (
<li key={event.id}>
<strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
</li>
))}
</ul>
) : (
<p>No upcoming events.</p>
)}
</div>
</div>
</div>
);
};

export default Home;