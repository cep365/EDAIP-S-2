function askQuestion(subject) {
  const subjectInputMap = {
    math: "math-question",
    english: "english-question",
    chemistry: "chemistry-question"
  };

  const responseMap = {
    math: "math-response",
    english: "english-response",
    chemistry: "chemistry-response"
  };

  const questionInput = document.getElementById(subjectInputMap[subject]);
  const question = questionInput.value;
  const responseDiv = document.getElementById(responseMap[subject]);

  if (!question.trim()) {
    responseDiv.innerText = "Please enter a question.";
    return;
  }

  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, question })
  })
    .then(res => res.json())
    .then(data => {
      responseDiv.innerText = data.answer + (data.explanation ? `\n\nExplanation: ${data.explanation}` : "");
      if (soundEnabled) speak(data.answer);
    })
    .catch(err => {
      responseDiv.innerText = "Error occurred. Try again.";
    });
}

function insertSymbol(inputId, symbol) {
  if (!symbol) return;
  const input = document.getElementById(inputId);
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.substring(0, start) + symbol + input.value.substring(end);
  input.focus();
  input.selectionStart = input.selectionEnd = start + symbol.length;
}

let soundEnabled = true;
function toggleVolume() {
  soundEnabled = !soundEnabled;
  document.getElementById("volume-icon").textContent = soundEnabled ? "🔊" : "🔇";
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function toggleMenu() {
  document.getElementById("burger-menu").classList.toggle("show");
}

document.getElementById("bot-image").addEventListener("click", () => {
  const dialogue = document.getElementById("bot-dialogue");
  dialogue.style.display = dialogue.style.display === "none" ? "block" : "none";
});
