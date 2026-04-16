import { useEffect, useState } from "react";
import API from "../api/api";
import "./Bookings.css";

export default function Bookings() {

  // ✅ DEFINE STATE FIRST
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FILTER LOGIC (UNCHANGED)
  const now = new Date();

  const upcoming = bookings.filter(
    b => new Date(b.start_time) > now
  );

  const past = bookings.filter(
    b => new Date(b.start_time) <= now
  );

  return (
    <div className="bookings-container">

      <h1>My Bookings</h1>

      {/* ✅ UPCOMING (UPDATED UI) */}
      <h2>Upcoming Bookings</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming bookings</p>
      ) : (
        upcoming.map(b => (
          <div key={b.id} className="card">
            <p><strong>{b.name}</strong></p>
            <p>{b.email}</p>
            <p>{new Date(b.start_time).toLocaleString()}</p>

            <button onClick={() => cancelBooking(b.id)}>
              Cancel
            </button>
          </div>
        ))
      )}

      {/* ✅ PAST (UPDATED UI) */}
      <h2>Past Bookings</h2>

      {past.length === 0 ? (
        <p>No past bookings</p>
      ) : (
        past.map(b => (
          <div key={b.id} className="card">
            <p><strong>{b.name}</strong></p>
            <p>{b.email}</p>
            <p>{new Date(b.start_time).toLocaleString()}</p>
          </div>
        ))
      )}

    </div>
  );
}