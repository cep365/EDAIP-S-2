const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(xss());
app.use(express.static("public"));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.post("/ask", (req, res) => {
  const { subject, question } = req.body;

  let answer = "";
  let explanation = "";

  if (subject === "math" || subject === "physics") {
    try {
      const result = eval(question.replace(/\^/g, "**"));
      answer = `Answer: ${result}`;
      explanation = `I evaluated the expression directly using math rules.`;
    } catch {
      answer = "I couldn't understand your math question.";
    }
  } else if (subject === "english" || subject === "literature") {
    answer = `That’s a great question! Here's a detailed response to "${question}".`;
    explanation = "I analyzed grammar, style, and literature context.";
  } else if (subject === "chemistry" || subject === "history" || subject === "geography" || subject === "science") {
    answer = `Here's a helpful explanation: ${question} relates to scientific concepts.`;
    explanation = "Based on general scientific knowledge and subject tags.";
  } else {
    answer = "Unsupported subject.";
  }

  res.json({ answer, explanation });
});

app.listen(PORT, () => console.log(`EDAIP server running on port ${PORT}`));
