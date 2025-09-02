import { useState } from "react";
import { useBills } from "../context/BillsProvider";

export default function AddExpenseForm() {
  const { roommates, addExpense } = useBills();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(roommates[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!title.trim() || !amt || !paidBy) return;

    addExpense({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: amt,
      paidBy,
      date,
      notes: notes.trim() || undefined,
    });

    setTitle("");
    setAmount("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="card-title">Add Expense</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense title"
        className="form-input"
      />

      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="form-input"
      />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        className="form-input"
      >
        {roommates.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="form-input"
      />

      <input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="form-input"
      />

      <button type="submit" className="btn">
        Add Expense
      </button>
    </form>
  );
}
