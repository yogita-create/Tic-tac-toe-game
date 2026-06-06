# 🎮 Tic Tac Toe — Emoji Edition

A fun and interactive **two-player Tic Tac Toe** game built with **React + HTML + CSS**, where players don't just play with X and O — they play with **emojis of their choice**!

---

## ✨ Features

- **Emoji Picker** — Each player can pick an emoji from a curated set *or* type in any custom emoji they want
- **Two Player Mode** — Play locally against a friend on the same device
- **Multi-Game Rounds** — Play multiple games in a single round; scores are tracked across games
- **New Round** — Reset scores and start fresh whenever you want
- **Reset** — Restart the current game without losing round scores
- **Resume** — Pick up a paused or interrupted game right where you left off
- **Replay** — Replay the last completed game instantly
- **Score Tracking** — Win counts are maintained across games within a round

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React (with Hooks) |
| Markup | HTML5 |
| Styling | CSS3 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tic-tac-toe.git

# Navigate into the project
cd "Tic tac toe"

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at `http://localhost:5173` (or whichever port Vite assigns).

---

## 🎯 How to Play

1. **Enter player names** and pick your emoji — choose from the preset options or type any emoji you like
2. **Take turns** clicking on the 3×3 grid to place your emoji
3. The first player to get **3 in a row** (horizontally, vertically, or diagonally) wins the game
4. Scores are tracked — keep playing multiple games in the same round
5. Hit **New Round** to reset scores and start over with a fresh slate

---

## 🎮 Game Controls

| Button | Action |
|--------|--------|
| **Reset** | Restart the current game (scores preserved) |
| **Replay** | Play the last game again |
| **Resume** | Continue an ongoing game |
| **New Round** | Clear all scores and start fresh |

---

## 📁 Project Structure

```
Tic tac toe/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── Tictactoe.css        
│   └── Tictactoe.jsx        
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🙌 Contributing

Pull requests are welcome! If you'd like to add features (AI opponent, sound effects, themes), feel free to fork and open a PR.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---
