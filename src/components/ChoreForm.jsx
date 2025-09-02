import React, { useState } from 'react';

const ChoreForm = ({ roommates, onAddChore }) => {
const [choreData, setChoreData] = useState({
title: '',
roommateId: '',
dueDate: '',
completed: false
});

const handleChange = (e) => {
const { name, value } = e.target;
setChoreData(prevData => ({ ...prevData, [name]: value }));
};

const handleSubmit = (e) => {
e.preventDefault();
if (!choreData.title || !choreData.roommateId) {
console.error('Title and roommate must be selected.');
return;
}
onAddChore(choreData);
setChoreData({
title: '',
roommateId: '',
dueDate: '',
completed: false
});
};

return (
<div className="chore-form-container">
<h2 className="page-title">Add a New Chore</h2>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="title">Chore Title</label>
<input
type="text"
id="title"
name="title"
value={choreData.title}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<label htmlFor="roommateId">Assign to</label>
<select
id="roommateId"
name="roommateId"
value={choreData.roommateId}
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
</div>
<div className="form-group">
<label htmlFor="dueDate">Due Date</label>
<input
type="date"
id="dueDate"
name="dueDate"
value={choreData.dueDate}
onChange={handleChange}
required
/>
</div>
<button type="submit">Add Chore</button>
</form>
</div>
);
};

export default ChoreForm;