import { useEffect, useState } from "react";
import API from "../api/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    slug: "",
    days: [],
    start_time: "",
    end_time: ""
  });

  const loadEvents = () => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const createEvent = async () => {
    if (!form.title || !form.slug) {
      alert("Title and Slug required");
      return;
    }

    try {
      await API.post("/events", {
        ...form,
        duration: parseInt(form.duration)
      });

      alert("Event created ✅");
      loadEvents();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error creating event ❌");
    }
  };

  const deleteEvent = async (id) => {
    await API.delete(`/events/${id}`);
    loadEvents();
  };

  // ✅ UPDATED EDIT FUNCTION (AS PER INSTRUCTION)
  const updateEvent = async (id, oldTitle) => {
    const newTitle = prompt("Edit title:", oldTitle);
    if (!newTitle) return;

    try {
      await API.put(`/events/${id}`, {
        ...form,
        title: newTitle
      });

      loadEvents();
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  const saveAvailability = async () => {
    try {
      await API.post("/availability", {
        days: form.days,
        start_time: form.start_time,
        end_time: form.end_time,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      alert("Availability Saved ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving ❌");
    }
  };

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Dashboard</h1>

      <div className="card">
        <h2>Create Event</h2>

        <div className="form-row">
          <input
            placeholder="Title"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Duration (e.g. 30)"
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />

          <input
            placeholder="Slug"
            onChange={e => setForm({ ...form, slug: e.target.value })}
          />

          <button onClick={createEvent}>Create</button>
        </div>
      </div>

      <div className="card">
        <h2>Set Availability</h2>

        <div className="form-row">
          <input
            placeholder="Days (Mon,Tue,Wed)"
            onChange={e =>
              setForm({ ...form, days: e.target.value.split(",") })
            }
          />

          <input
            placeholder="Start Time (09:00)"
            onChange={e =>
              setForm({ ...form, start_time: e.target.value })
            }
          />

          <input
            placeholder="End Time (17:00)"
            onChange={e =>
              setForm({ ...form, end_time: e.target.value })
            }
          />

          <button onClick={saveAvailability}>
            Save
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Your Events</h2>

        {events.length === 0 ? (
          <p className="empty-text">No events created yet</p>
        ) : (
          events.map(e => (
            <div key={e.id} className="event-card">

              <div>
                <p className="event-title">{e.title}</p>

                <p className="event-link">
                  <a
                    href={`/book/${e.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /book/{e.slug}
                  </a>
                </p>
              </div>

              <div>
                {/* ✅ UPDATED BUTTON */}
                <button
                  className="edit-btn"
                  onClick={() => updateEvent(e.id, e.title)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(e.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}