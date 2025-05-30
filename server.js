const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/ask", (req, res) => {
  const { subject, question } = req.body;

  if (!subject || !question) {
    return res.status(400).json({ error: "Missing subject or question." });
  }

  const q = question.toLowerCase();
  let answer = "";

  try {
    switch (subject) {
      case "math":
        answer = handleMath(q);
        break;
      case "english":
      case "literature":
        answer = handleEnglish(q);
        break;
      case "chemistry":
        answer = handleChemistry(q);
        break;
      case "physics":
        answer = handlePhysics(q);
        break;
      case "history":
        answer = handleHistory(q);
        break;
      case "geography":
        answer = handleGeography(q);
        break;
      case "science":
        answer = handleScience(q);
        break;
      default:
        answer = "I'm still learning about that subject.";
    }

    res.json({ answer });
  } catch (err) {
    console.error("❌ Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// --- Subject Handlers (unchanged) ---
function handleMath(q) {
  if (q.includes("solve for x")) {
    return "To solve for x in '2x + 4 = 10', subtract 4: 2x = 6. Divide by 2: x = 3.";
  }
  if (q.includes("integrate") || q.includes("derivative")) {
    return "To integrate x^2, use power rule: ∫x² dx = x³/3 + C. Derivatives use d/dx rules.";
  }
  if (q.match(/\d+ \+ \d+/)) {
    const nums = q.match(/\d+/g).map(Number);
    return `Adding ${nums[0]} + ${nums[1]} = ${nums[0] + nums[1]}`;
  }
  return "Try asking a word problem or equation like 'solve for x: 3x + 2 = 11'.";
}

function handleEnglish(q) {
  if (q.includes("passive voice")) {
    return "Passive: 'The cake was eaten by John.' → Active: 'John ate the cake.'";
  }
  if (q.includes("thesis")) {
    return "A strong thesis clearly states your main argument and sets up your essay structure.";
  }
  return "Tip: Check your grammar, sentence structure, and be clear with your ideas!";
}

function handleChemistry(q) {
  if (q.includes("h2o")) return "H2O is water, made of 2 hydrogen atoms and 1 oxygen atom.";
  if (q.includes("acid") && q.includes("base")) return "Acids donate H+ ions, bases accept them. They form salt + water.";
  return "Chemistry covers atoms, reactions, the periodic table, and bonds. Try asking about elements or reactions!";
}

function handlePhysics(q) {
  if (q.includes("newton")) return "Newton’s 2nd Law: F = ma (Force = mass × acceleration).";
  if (q.includes("velocity") && q.includes("time")) return "Velocity = Distance / Time.";
  return "Physics explores motion, forces, energy, and laws of the universe. Try asking about speed or gravity!";
}

function handleHistory(q) {
  if (q.includes("world war ii")) return "WWII (1939–1945): Axis vs Allies. Major causes: Treaty of Versailles, expansionism.";
  if (q.includes("cause of")) return "Look at economic, political, and social tensions to find causes of historical events.";
  return "Ask about specific events like 'Causes of WWI' or 'When did Rome fall?'.";
}

function handleGeography(q) {
  if (q.includes("capital of")) return "Try asking 'What is the capital of France?' → Answer: Paris.";
  if (q.includes("continent")) return "Earth has 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.";
  return "Geography covers landforms, maps, countries, and climate. Try asking about a place or region!";
}

function handleScience(q) {
  if (q.includes("photosynthesis")) return "Photosynthesis: plants convert sunlight into energy. Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.";
  if (q.includes("digestive system")) return "Digestive system: breaks down food into nutrients. Key parts: mouth, stomach, intestines.";
  return "Science includes biology, chemistry, physics, and Earth science. Ask about systems, reactions, or concepts!";
}

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ EDAIP server running at http://localhost:${PORT}`);
});
