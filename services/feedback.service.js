const db = require("../db");

const submitFeedback = (req, res) => {
  const ticketId = Number(req.params.id);

  const { humanCategory } = req.body;

  const ticket = db
    .prepare("SELECT * FROM tickets WHERE id=?")
    .get(ticketId);

  if (!ticket) {
    return res.status(404).json({
      error: "Ticket not found",
    });
  }

  const delta =
    ticket.ai_category === humanCategory ? 0 : 1;

  db.prepare(`
    INSERT INTO feedback
    (ticket_id, ai_category, human_category, delta)
    VALUES (?,?,?,?)
  `).run(
    ticketId,
    ticket.ai_category,
    humanCategory,
    delta
  );

  db.prepare(`
    UPDATE tickets
    SET human_category=?
    WHERE id=?
  `).run(humanCategory, ticketId);

  res.json({
    ticketId,
    aiCategory: ticket.ai_category,
    humanCategory,
    changed: delta === 1,
  });
};

module.exports = {
  submitFeedback,
};