const userId = `user_${Math.floor(Math.random() * 999999)}`;
const loadingPhrases = [
  "Thinking like a human...",
  "Calibrating AI mind...",
  "Shuffling strategy deck...",
  "Polishing Connect Four grid...",
  "Connecting to quantum dots..."
];

document.getElementById("ready-btn").onclick = () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("loading-text").textContent = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    loadScore();
  }, 2000);
};

document.getElementById("guess-human").onclick = () => guess("human");
document.getElementById("guess-ai").onclick = () => guess("ai");

function guess(choice) {
  const correct = Math.random() < 0.5 ? "human" : "ai";
  const isCorrect = choice === correct;
  document.getElementById("result-text").textContent = `You guessed ${choice.toUpperCase()}. It was ${correct.toUpperCase()}. ${isCorrect ? "Correct!" : "Wrong!"}`;

  if (isCorrect) updateScore(1);
}

function loadScore() {
  fetch(`/api/score/${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("score").textContent = data.score;
    });
}

function updateScore(delta) {
  fetch("/api/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: userId, delta })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("score").textContent = data.score;
    });
}
