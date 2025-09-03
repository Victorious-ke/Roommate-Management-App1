import React from 'react';

const ChoreItem = ({ chore, roommates, onToggleStatus }) => {
const assignedRoommate = roommates.find(r => r.id === chore.roommateId);

return (
<li className={`chore-item ${chore.completed ? 'chore-completed' : ''}`}>
<div>
<h3>{chore.title}</h3>
<p>Assigned to: <strong>{assignedRoommate ? assignedRoommate.name : 'Unassigned'}</strong></p>
<p>Status: <strong>{chore.completed ? 'Done' : 'Pending'}</strong></p>
<p>Due Date: {chore.dueDate}</p>
</div>
<button onClick={() => onToggleStatus(chore.id, !chore.completed)}>
{chore.completed ? 'Undo' : 'Complete'}
</button>
</li>
);
};

export default ChoreItem;