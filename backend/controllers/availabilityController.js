const db = require("../config/db");

// SAVE
exports.setAvailability = (req, res) => {
  const { days, start_time, end_time, timezone } = req.body;

  db.query("DELETE FROM availability");

  db.query(
    "INSERT INTO availability (days, start_time, end_time, timezone) VALUES (?, ?, ?, ?)",
    [JSON.stringify(days), start_time, end_time, timezone],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Saved" });
    }
  );
};

// GET
exports.getAvailability = (req, res) => {
  db.query("SELECT * FROM availability LIMIT 1", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0] || {});
  });
};