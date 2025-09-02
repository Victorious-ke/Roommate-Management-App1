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

        
        