import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>🎉 Booking Confirmed</h2>

      <p>{state?.date}</p>
      <p>{state?.time}</p>

      <button onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}