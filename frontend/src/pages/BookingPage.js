import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import "./BookingPage.css";

export default function BookingPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeSlotsDynamic, setTimeSlotsDynamic] = useState([]);

  const [eventData, setEventData] = useState(null);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM",
    "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM"
  ];

  useEffect(() => {
    if (slug) {
      API.get("/events")
        .then(res => {
          const event = res.data.find(e => e.slug === slug);
          setEventData(event);
        })
        .catch(() => setEventData(null));
    }
  }, [slug]);

  useEffect(() => {
    if (form.date) {
      API.get(`/bookings/available-slots?date=${form.date}`)
        .then(res => setAvailableSlots(res.data))
        .catch(() => setAvailableSlots([]));
    }
  }, [form.date]);

  useEffect(() => {
    if (form.date && eventData) {
      API.get("/availability")
        .then(res => {
          const data = res.data;

          if (!data || !data.start_time) return;

          const selectedDay = new Date(form.date).toLocaleString("en-US", {
            weekday: "short"
          });

          if (data.days && !JSON.parse(data.days).includes(selectedDay)) {
            setTimeSlotsDynamic([]);
            return;
          }

          let start = parseInt(data.start_time.split(":")[0]);
          let end = parseInt(data.end_time.split(":")[0]);

          let duration = eventData.duration || 30;

          let slots = [];

          for (let i = start * 60; i < end * 60; i += duration) {
            let hour = Math.floor(i / 60);
            let minutes = i % 60;

            let ampm = hour >= 12 ? "PM" : "AM";
            hour = hour % 12 || 12;

            let time = `${hour.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`;

            slots.push(time);
          }

          setTimeSlotsDynamic(slots);
        })
        .catch(() => setTimeSlotsDynamic([]));
    }
  }, [form.date, eventData]);

  const book = async () => {
    setError("");

    if (!form.name || !form.email || !form.date || !form.time) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/bookings", {
        name: form.name,
        email: form.email,
        date: form.date,
        time: form.time,
        slug: slug
      });

      navigate("/confirmation", {
        state: {
          date: form.date,
          time: form.time
        }
      });

    } catch (err) {
      setError(err.response?.data?.message || "Slot already booked ❌");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // const finalSlots = timeSlotsDynamic.length
  //   ? timeSlotsDynamic
  //   : timeSlots;

  return (
    <div className="booking-wrapper">

      <h1 className="logo">Cal.com</h1>

      <div className="booking-card">

        <h2>Book Meeting</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <p className="timezone">
          Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone.replace("Calcutta","Kolkata")}
        </p>

        <p className="label">Select Time</p>

        <div className="slots">
          {(timeSlotsDynamic.length ? timeSlotsDynamic : timeSlots).map((t, i) => {
            const isAvailable = availableSlots.includes(t);

            return (
              <button
                key={i}
                disabled={!isAvailable}
                onClick={() => setForm({ ...form, time: t })}
                className={`${form.time === t ? "active" : ""} ${!isAvailable ? "disabled" : ""}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {form.date && form.time && (
          <div className="summary">
            <p><strong>Date:</strong> {formatDate(form.date)}</p>
            <p><strong>Time:</strong> {form.time}</p>
          </div>
        )}

        <button
          className="book-btn"
          onClick={book}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </div>
    </div>
  );
}