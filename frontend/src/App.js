import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import Bookings from "./pages/Bookings";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* BOOKING */}
        <Route path="/book" element={<BookingPage />} />
        <Route path="/book/:slug" element={<BookingPage />} />

        {/* BOOKINGS */}
        <Route path="/bookings" element={<Bookings />} />

        {/* CONFIRMATION */}
        <Route path="/confirmation" element={<Confirmation />} />

        {/* OPTIONAL FALLBACK */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;