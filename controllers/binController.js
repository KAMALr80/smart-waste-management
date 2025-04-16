
const db = require("../db");
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

exports.getAllBins = async (req, res) => {
  const bins = await db.query("SELECT * FROM bins");
  res.json(bins.rows);
};

exports.getSummary = async (req, res) => {
  const total = await db.query("SELECT COUNT(*) FROM bins");
  const full = await db.query("SELECT COUNT(*) FROM bins WHERE status='Full'");
  const half = await db.query("SELECT COUNT(*) FROM bins WHERE status='Half'");
  const empty = await db.query("SELECT COUNT(*) FROM bins WHERE status='Empty'");
  res.json({
    total: total.rows[0].count,
    full: full.rows[0].count,
    half: half.rows[0].count,
    empty: empty.rows[0].count,
  });
};

exports.getHistory = async (req, res) => {
  const history = await db.query("SELECT * FROM bins ORDER BY last_cleared DESC");
  res.json(history.rows);
};

exports.updateBinStatus = async (req, res) => {
  const { id, status } = req.body;
  await db.query("UPDATE bins SET status=$1, last_cleared=NOW() WHERE id=$2", [status, id]);

  if (status === "Full") {
    await client.messages.create({
      body: `Bin ID ${id} is FULL. Please collect it.`,
      from: process.env.TWILIO_PHONE,
      to: process.env.MUNICIPAL_PHONE,
    });
  }

  res.json({ success: true });
};
