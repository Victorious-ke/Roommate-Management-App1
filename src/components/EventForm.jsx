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
  