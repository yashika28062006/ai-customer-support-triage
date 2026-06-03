require("dotenv").config();

const express = require("express");

const {
  triageTickets,
  getStats,
} = require("./services/triage.service");

const {
  submitFeedback,
} = require("./services/feedback.service");

const {
  getAccuracyReport,
} = require("./services/accuracy.service");

const app = express();

app.use(express.json());

app.post("/triage", triageTickets);

app.get("/triage/stats", getStats);

app.post("/triage/:id/feedback", submitFeedback);

app.get("/triage/accuracy", getAccuracyReport);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});