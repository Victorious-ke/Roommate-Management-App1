import { useBills } from "../context/BillsProvider";

export default function ExpenseList() {
  const { expenses, roommates } = useBills();

  function getRoommateName(id) {
    return roommates.find((r) => r.id === id)?.name || "Unknown";
  }

  if (expenses.length === 0) {
    return <p className="empty">No expenses yet.</p>;
  }

  return (
    <div className="card">
      <h2 className="card-title">All Expenses</h2>
      <ul className="list">
        {expenses.map((e) => (
          <li key={e.id} className="list-item">
            <div className="list-info">
              <span className="expense-title">{e.title}</span>
              <span className="expense-amount">KES {e.amount.toFixed(2)}</span>
            </div>
            <div className="list-meta">
              <span>Paid by: {getRoommateName(e.paidBy)}</span>
              <span>{e.date}</span>
            </div>
            {e.notes && <p className="expense-notes">{e.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
