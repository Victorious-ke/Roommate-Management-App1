import React, { useEffect, useState } from "react";

// 🔹 Form used for creating/updating events
export default function EventForm({ event, date, onClose, refreshEvents }) {
  const [chores, setChores] = useState([]);
  const [bills, setBills] = useState([]);
  