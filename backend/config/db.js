const mysql = require("mysql2");

const db = mysql.createPool(process.env.MYSQL_URL);

db.getConnection((err, conn) => {
  if (err) {
    console.error("DB Connection Failed ❌", err);
  } else {
    console.log("DB Connected ✅");
    conn.release();
  }
});

module.exports = db;