import React from 'react';
import ChoreItem from './ChoreItem';

const ChoreList = ({ chores, roommates, onToggleStatus }) => {
return (
<div className="chore-list-container">
{chores.map(chore => (
<ChoreItem
key={chore.id}
chore={chore}
roommates={roommates}
onToggleStatus={onToggleStatus}
/>
))}
</div>
);
};

export default ChoreList;