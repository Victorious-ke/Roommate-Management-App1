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
  