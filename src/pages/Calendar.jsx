import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import "./Calendar.css"; // custom styling

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  // Fetch events from db.json
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Add new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventToAdd = {
      ...newEvent,
      id: Date.now().toString(),
      createdBy: "1",
      participants: ["1"],
      startTime: new Date(newEvent.startTime).toISOString(),
      endTime: new Date(newEvent.endTime).toISOString(),
      relatedType: "custom",
      relatedId: "0",
    };

    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventToAdd),
      });
      if (res.ok) {
        setEvents([...events, eventToAdd]);
        setNewEvent({ title: "", description: "", startTime: "", endTime: "" });
      }
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  