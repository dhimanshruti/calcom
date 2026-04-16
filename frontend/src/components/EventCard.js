export default function EventCard({ event, onDelete }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      margin: "10px 0"
    }}>
      <h3>{event.title}</h3>
      <p>{event.duration} mins</p>

      <button onClick={() => onDelete(event.id)}>
        Delete
      </button>
    </div>
  );
}