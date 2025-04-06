import React, { useEffect, useRef, useState } from "react";

function App() {
  const [screen, setScreen] = useState("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [lives, setLives] = useState(3);

  const questions = [
    { q: "What is 1 + 1?", a: "2" },
    { q: "What is 14 - 6?", a: "8" },
    { q: "What is 7 × 3?", a: "21" },
    { q: "What is 81 ÷ 9?", a: "9" },
    { q: "What is the square of 8?", a: "64" },
    { q: "Solve: 5x = 20", a: "4" },
    { q: "What is the cube of 3?", a: "27" },
    { q: "Solve: 3x + 7 = 22", a: "5" },
    { q: "What is the square root of 225?", a: "15" },
    { q: "What is 15% of 200?", a: "30" },
    { q: "Convert 0.75 to a fraction.", a: "3/4" },
  ];

  // Simulate loading progress
  useEffect(() => {
    if (screen === "loading" && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [screen, loadingProgress]);

  // Sync music playing state
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch((err) => console.error("Play failed", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const handleContinue = () => {
    setScreen("madeby");
    setIsMusicPlaying(true);
  };

  const handleMadeByDone = () => {
    setScreen("start");
  };

  const startGame = () => {
    resetGame();
    setScreen("game");
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setLives(3);
    setInput("");
  };

  const handleSubmit = () => {
    if (input.trim() === questions[questionIndex].a) {
      if (questionIndex === questions.length - 1) {
        alert("You win!");
        setScreen("start");
        resetGame();
      } else {
        setQuestionIndex(questionIndex + 1);
        setInput("");
      }
    } else {
      const newLives = lives - 1;
      if (newLives <= 0) {
        setLives(0);
        setScreen("gameover");
      } else {
        setLives(newLives);
        alert("Wrong! Try again.");
      }
    }
  };

  const handleSkip = () => {
    if (questionIndex === questions.length - 1) {
      alert("You win!");
      setScreen("start");
      resetGame();
    } else {
      setQuestionIndex(questionIndex + 1);
      setInput("");
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div style={styles.container}>
      {screen === "loading" && (
        <div style={styles.centerContent}>
          <h1 style={styles.title}>Loading... {loadingProgress}%</h1>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${loadingProgress}%` }} />
          </div>
          {loadingProgress === 100 && (
            <button style={styles.startButton} onClick={handleContinue}>
              Continue
            </button>
          )}
        </div>
      )}

      {screen === "madeby" && (
        <div style={styles.centerContent}>
          <h1 style={styles.title}>Made by Loopter</h1>
          <button style={styles.startButton} onClick={handleMadeByDone}>
            Start
          </button>
        </div>
      )}

      {screen === "start" && (
        <div style={styles.centerContent}>
          <h1 style={styles.title}>Math Quiz Game</h1>
          <button style={styles.startButton} onClick={startGame}>
            Play
          </button>
          <button style={styles.toggleMusicButton} onClick={toggleMusic}>
            {isMusicPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>
      )}

      {screen === "game" && (
        <div style={styles.gameContainer}>
          <h2 style={styles.title}>{questions[questionIndex].q}</h2>
          <div style={styles.questionNumber}>Question {questionIndex + 1}</div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <div style={{ marginTop: 20 }}>
            <button style={styles.startButton} onClick={handleSubmit}>
              Submit
            </button>
            <button style={{ ...styles.skipButton, marginLeft: 10 }} onClick={handleSkip}>
              Skip
            </button>
          </div>
          <div style={styles.livesContainer}>Lives: {lives}</div>
          <div style={styles.musicControl}>
            <button style={styles.toggleMusicButton} onClick={toggleMusic}>
              {isMusicPlaying ? "Pause Music" : "Play Music"}
            </button>
          </div>
        </div>
      )}

      {screen === "gameover" && (
        <div style={styles.centerContent}>
          <h1 style={styles.title}>Game Over</h1>
          <button style={styles.startButton} onClick={() => setScreen("start")}>
            Try Again
          </button>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/Heaven_and_Hell.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    color: "white",
    flexDirection: "column",
    overflow: "hidden",
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
  },
  input: {
    padding: 16,
    fontSize: 24,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: 300,
  },
  startButton: {
    backgroundColor: "green",
    color: "white",
    fontSize: 24,
    padding: "16px 32px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  skipButton: {
    backgroundColor: "gray",
    color: "white",
    fontSize: 22,
    padding: "14px 28px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  toggleMusicButton: {
    backgroundColor: "#202020",
    color: "white",
    fontSize: 20,
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    marginTop: 10,
    cursor: "pointer",
  },
  questionNumber: {
    fontSize: 20,
  },
  livesContainer: {
    fontSize: 24,
    marginTop: 20,
  },
  musicControl: {
    marginTop: 20,
  },
  progressBar: {
    width: "300px",
    height: "20px",
    backgroundColor: "#444",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "limegreen",
    transition: "width 0.3s",
  },
};

export default App;
