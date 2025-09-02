import React, { useEffect, useState } from "react";

// 🔹 Form used for creating/updating events
export default function EventForm({ event, date, onClose, refreshEvents }) {
  const [chores, setChores] = useState([]);
  const [bills, setBills] = useState([]);
  // Local form state
  const [form, setForm] = useState({
    title: event?.title || "",
    description: event?.description || "",
    startTime: event?.start || date || new Date().toISOString(),
    endTime: event?.end || date || new Date().toISOString(),
    relatedChoreId: event?.relatedChoreId || "",
    relatedBillId: event?.relatedBillId || "",
  });
  // 🔹 Fetch dropdown data (chores & bills)
  useEffect(() => {
    fetch("http://localhost:3000/chores")
      .then((res) => res.json())
      .then((data) => setChores(data));

    fetch("http://localhost:3000/bills")
      .then((res) => res.json())
      .then((data) => setBills(data));
  }, []);
  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 // 🔹 Submit form → save to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = event ? "PUT" : "POST";
    const url = event
      ? `http://localhost:3000/events/${event.id}`
      : "http://localhost:3000/events";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    refreshEvents();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {event ? "Edit Event" : "Add Event"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Event Title"
        className="border p-2 w-full rounded mb-3"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="border p-2 w-full rounded mb-3"
      />

      {/* Start Time */}
      <label className="text-sm">Start Time</label>
      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime.toString().slice(0, 16)}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-3"
      />

      {/* End Time */}
      <label className="text-sm">End Time</label>
      <input
        type="datetime-local"
        name="endTime"
        value={form.endTime.toString().slice(0, 16)}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-3"
      />

      {/* Related Chore */}
      <select
        name="relatedChoreId"
        value={form.relatedChoreId}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-3"
      >
        <option value="">-- Link to Chore --</option>
        {chores.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Related Bill */}
      <select
        name="relatedBillId"
        value={form.relatedBillId}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-3"
      >
        <option value="">-- Link to Bill --</option>
        {bills.map((b) => (
          <option key={b.id} value={b.id}>
            {b.title}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}