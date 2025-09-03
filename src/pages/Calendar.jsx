import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import "..styles/Calendar.css"; // custom styling

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

  // Filter events for selected day
  const eventsForDate = events.filter(
    (event) =>
      format(new Date(event.startTime), "yyyy-MM-dd") ===
      format(date, "yyyy-MM-dd")
  );

  return (
    <div className="calendar-page">
      <h1 className="page-title"> Roommate Calendar</h1>

      <div className="calendar-container">
        {/* Calendar */}
        <div className="calendar-card">
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* Events */}
        <div className="events-card">
          <h2 className="section-title">Events on {format(date, "PPP")}</h2>
          {eventsForDate.length > 0 ? (
            <ul className="events-list">
              {eventsForDate.map((event) => (
                <li key={event.id} className="event-item">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <small>
                    {format(new Date(event.startTime), "p")} -{" "}
                    {format(new Date(event.endTime), "p")}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-events">No events today.</p>
          )}
        </div>

        {/* Add Event Form */}
        <div className="form-card">
          <h2 className="section-title">➕ Add New Event</h2>
          <form onSubmit={handleSubmit} className="event-form">
            <label>
              Title
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                required
              />
            </label>
            <label>
              Start Time
              <input
                type="datetime-local"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                required
              />
            </label>
            <label>
              End Time
              <input
                type="datetime-local"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                required
              />
            </label>
            <button type="submit" className="add-btn">
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
