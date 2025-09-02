import { useBills } from "../context/BillsProvider";

export default function BalanceSummary() {
  const { roommates, expenses } = useBills();

  if (roommates.length === 0) return null;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const share = roommates.length > 0 ? total / roommates.length : 0;

  function calcBalance(id) {
    const paid = expenses
      .filter((e) => e.paidBy === id)
      .reduce((sum, e) => sum + e.amount, 0);
    return paid - share;
  }

  return (
    <div className="card">
      <h2 className="card-title">Balance Summary</h2>
      <ul className="list">
        {roommates.map((r) => {
          const balance = calcBalance(r.id);
          return (
            <li
              key={r.id}
              className={`list-item balance ${
                balance >= 0 ? "positive" : "negative"
              }`}
            >
              <span className="roommate-name">{r.name}</span>
              <span>
                {balance >= 0 ? "+" : "-"}KES {Math.abs(balance).toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
