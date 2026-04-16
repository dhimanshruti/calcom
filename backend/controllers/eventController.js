const db = require("../config/db");

// CREATE EVENT
exports.createEvent = (req, res) => {
  const { title, description, duration, slug } = req.body;

  // ✅ VALIDATION
  if (!title || !slug || !duration) {
    return res.status(400).json({
      message: "Title, Duration and Slug are required ❌"
    });
  }

  // ✅ CHECK DUPLICATE SLUG
  db.query(
    "SELECT id FROM events WHERE slug = ?",
    [slug],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error ❌" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Slug already exists ❌"
        });
      }

      // ✅ INSERT EVENT
      db.query(
        "INSERT INTO events (title, description, duration, slug) VALUES (?, ?, ?, ?)",
        [title, description || "", parseInt(duration), slug],
        (err) => {
          if (err) {
            console.error(err); // 🔥 VERY IMPORTANT
            return res.status(500).json({ message: "Insert failed ❌" });
          }

          res.json({ message: "Event created ✅" });
        }
      );
    }
  );
};

// GET EVENTS
exports.getEvents = (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// DELETE EVENT
exports.deleteEvent = (req, res) => {
  db.query("DELETE FROM events WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};

// UPDATE EVENT
exports.updateEvent = (req, res) => {
  let { title, description, duration, slug } = req.body;

  duration = parseInt(duration); // ✅ FIX

  db.query(
    "UPDATE events SET title=?, description=?, duration=?, slug=? WHERE id=?",
    [title, description, duration, slug, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
};