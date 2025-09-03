import React, { useState, useEffect } from 'react';
import ChoreItem from './ChoreItem';

const Chores = ({ chores, roommates, onAddChore, onToggleStatus, onDeleteChore }) => {
const [newChoreData, setNewChoreData] = useState({
title: '',
roommateId: '',
dueDate: ''
});

const handleChange = (e) => {
const { name, value } = e.target;
setNewChoreData(prevData => ({ ...prevData, [name]: value }));
};

const handleSubmit = (e) => {
e.preventDefault();
if (!newChoreData.title || !newChoreData.roommateId || !newChoreData.dueDate) {
console.error('Please fill out all fields for the chore.');
return;
}
onAddChore(newChoreData);
setNewChoreData({ title: '', roommateId: '', dueDate: '' });
};

if (!chores || !Array.isArray(chores)) {
return <div className="page-container">No chores found.</div>;
}

return (
<div className="page-container">
<h2 className="page-title">Chores</h2>
<form onSubmit={handleSubmit} className="chore-form">
<input
type="text"
name="title"
value={newChoreData.title}
onChange={handleChange}
placeholder="Chore Title"
required
/>
<select
name="roommateId"
value={newChoreData.roommateId}
onChange={handleChange}
required
>
<option value="">Select a Roommate</option>
{roommates.map(roommate => (
<option key={roommate.id} value={roommate.id}>
{roommate.name}
</option>
))}
</select>
<input
type="date"
name="dueDate"
value={newChoreData.dueDate}
onChange={handleChange}
required
/>
<button type="submit">Add Chore</button>
</form>
<ul className="chore-list-container">
{chores.length > 0 ? (
chores.map(chore => {
const assignedRoommate = roommates.find(r => r.id === chore.roommateId);
const assignedName = assignedRoommate ? assignedRoommate.name : 'Unassigned';
return (
<li key={chore.id} className={`chore-item ${chore.completed ? 'chore-completed' : ''}`}>
<div>
<h3>{chore.title}</h3>
<p>Assigned to: <strong>{assignedName}</strong></p>
<p>Due Date: {chore.dueDate}</p>
<p>Status: <strong>{chore.completed ? 'Done' : 'Pending'}</strong></p>
</div>
{chore.completed ? (
// Display both "Undo" and "Delete" buttons for completed chores
<div>
<button onClick={() => onToggleStatus(chore.id, false)}>Undo</button>
<button onClick={() => onDeleteChore(chore.id)}>Delete</button>
</div>
) : (
// Display only "Complete" button for pending chores
<button onClick={() => onToggleStatus(chore.id, true)}>Complete</button>
)}
</li>
);
})
) : (
<p>There are no chores scheduled.</p>
)}
</ul>
</div>
);
};

export default Chores;