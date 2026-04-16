// import "./Home.css";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate(); // ✅ navigation hook

//   return (
//     <div>

//       {/* NAVBAR */}
//       <div className="navbar">
//         <h1>Cal.com</h1>

//         <div className="nav-links">
//           <button>Solutions</button>
//           <button>Pricing</button>

//           {/* ✅ FIXED */}
//           <button className="btn" onClick={() => navigate("/book")}>
//             Get Started
//           </button>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="container">

//         {/* LEFT */}
//         <div className="left">
//           <h1>The better way to schedule your meetings</h1>

//           <p>
//             A fully customizable scheduling software for individuals and businesses.
//           </p>

//           {/* ✅ FIXED */}
//           <button onClick={() => navigate("/book")}>
//             Get Started
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="card">
//           <h2>30 Min Meeting</h2>
//           <p>Select a date</p>

//           <div className="calendar">
//             {[...Array(30)].map((_, i) => (
//               <div key={i} className="day">
//                 {i + 1}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <div className="navbar">
        <h2 className="logo">Cal.com</h2>

        <div className="nav-right">
          <button onClick={() => navigate("/dashboard")} className="nav-btn">
            Dashboard
          </button>

          <button onClick={() => navigate("/book")} className="primary-btn">
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">

        <div className="hero-left">
          <h1>
            The better way to <br /> schedule your meetings
          </h1>

          <p>
            A fully customizable scheduling software for individuals and businesses.
          </p>

          <button
            className="primary-btn big"
            onClick={() => navigate("/book")}
          >
            Get Started
          </button>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="calendar-card">
            <h3>30 Min Meeting</h3>
            <p>Select a date</p>

            <div className="calendar-grid">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="date-box">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}