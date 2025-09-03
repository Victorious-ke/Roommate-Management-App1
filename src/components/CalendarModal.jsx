import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";

// 🔹 Popup modal that shows either:
// - Event details (with edit/delete)
// - EventForm (for adding a new one)
export default function CalendarModal({ event, date, onClose, refreshEvents }) {
  const [relatedChore, setRelatedChore] = useState(null);
  const [relatedBill, setRelatedBill] = useState(null);
  const [isEditing, setIsEditing] = useState(!event); // New event = start in edit mode
  // 🔹 Fetch related Chore/Bill if event exists
  useEffect(() => {
    if (event?.relatedChoreId) {
      fetch(`http://localhost:3000/chores/${event.relatedChoreId}`)
        .then((res) => res.json())
        .then((data) => setRelatedChore(data));
    }
    if (event?.relatedBillId) {
      fetch(`http://localhost:3000/bills/${event.relatedBillId}`)
        .then((res) => res.json())
        .then((data) => setRelatedBill(data));
    }
  }, [event]);
 // 🔹 Delete event
  const handleDelete = async () => {
    if (!event) return;
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });
    refreshEvents();
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] relative">
        <button
          className="absolute top-4 right-6 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* If editing → show form */}
        {isEditing ? (
          <EventForm
            event={event}
            date={date}
            onClose={onClose}
            refreshEvents={refreshEvents}
          />
        ) : (
          <div>
            {/* Event details */}
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              {new Date(event.start).toLocaleString()} -{" "}
              {new Date(event.end).toLocaleString()}
            </p>

            {/* Linked Chore */}
            {relatedChore && (
              <div className="mt-3 p-2 border rounded bg-gray-100">
                <strong>Related Chore:</strong> {relatedChore.title}
              </div>
            )}

            {/* Linked Bill */}
            {relatedBill && (
              <div className="mt-3 p-2 border rounded bg-gray-100">
                <strong>Related Bill:</strong> {relatedBill.title}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}