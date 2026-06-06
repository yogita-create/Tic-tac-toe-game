import React, { useState, useEffect, useRef } from "react";
import "./Tictactoe.css";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* calculate winner */
function calculateWinner(board) {
  for (let [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: null, line: [] };
  return null;
}

const PRESET_SYMBOLS = ["X", "O", "★", "●", "▲", "♢", "🙂", "🔥", "🍀"];

export default function Tictactoe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);


  const [history, setHistory] = useState([]);

  const [scores, setScores] = useState({ p1: 0, p2: 0, draws: 0 });

  // Players info
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [player1Symbol, setPlayer1Symbol] = useState("X");
  const [player2Symbol, setPlayer2Symbol] = useState("O");

  const [customSymbol1, setCustomSymbol1] = useState("");
  const [customSymbol2, setCustomSymbol2] = useState("");

  const [showRules, setShowRules] = useState(false);

  
  const [symbolsLocked, setSymbolsLocked] = useState(false);

  const result = calculateWinner(board);

  const cellRefs = useRef([]);
  const boardWrapRef = useRef(null);
  const [linePath, setLinePath] = useState(null);

  useEffect(() => {
    if (result && result.line && boardWrapRef.current) {
      const rect = boardWrapRef.current.getBoundingClientRect();

      const centers = result.line.map((idx) => {
        const el = cellRefs.current[idx];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - rect.left,
          y: r.top + r.height / 2 - rect.top,
        };
      });

      if (centers.some((c) => c === null)) {
        setLinePath(null);
        return;
      }

      setLinePath(`M ${centers[0].x} ${centers[0].y} L ${centers[2].x} ${centers[2].y}`);

      const t = setTimeout(() => setLinePath(null), 1200);
      return () => clearTimeout(t);
    } else {
      setLinePath(null);
    }
  }, [result]);

  const currentSymbol = () => (xIsNext ? player1Symbol : player2Symbol);

  function handleClick(i) {
    if (board[i] || result) return;

    // Lock symbols after FIRST MOVE
    if (!symbolsLocked) setSymbolsLocked(true);

    // Build newBoard
    const newBoard = [...board];
    newBoard[i] = currentSymbol();

    
    setHistory((h) => [
      ...h,
      {
        board: board.slice(),         
        xIsNext,                      
        scores: { ...scores },        
        symbolsLocked,                
      },
    ]);

    
    setBoard(newBoard);
    setXIsNext((p) => !p);

    // Compute result and update scores if needed
    const r = calculateWinner(newBoard);

    if (r) {
      if (r.winner === player1Symbol) setScores((s) => ({ ...s, p1: s.p1 + 1 }));
      else if (r.winner === player2Symbol) setScores((s) => ({ ...s, p2: s.p2 + 1 }));
      else setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else if (newBoard.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  }

  function undo() {
    if (!history.length) return;

    const lastState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setBoard(lastState.board);
    setXIsNext(lastState.xIsNext);
    setScores(lastState.scores);
    setSymbolsLocked(lastState.symbolsLocked);

    setHistory(newHistory);
    setLinePath(null);

    
    if (newHistory.length === 0) {
      setSymbolsLocked(false);
    }
  }

  function resetBoard(clearScores = false) {
    setBoard(Array(9).fill(null));
    setHistory([]);
    setXIsNext(true);
    setLinePath(null);
    setSymbolsLocked(false);

    if (clearScores) setScores({ p1: 0, p2: 0, draws: 0 });
  }

  const playerLabel = (symbol) => {
    if (symbol === player1Symbol) return player1Name;
    if (symbol === player2Symbol) return player2Name;
    return symbol;
  };

  return (
    <div className="ttt-page">
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>

        {/* SETTINGS */}
        <div className="settings-row">
          <div className="player-settings">
            {/* PLAYER 1 */}
            <div className="player-block">
              <label className="label">Player 1 Name</label>
              <input
                className="text-input"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Player 1"
              />

              <label className="label">Symbol</label>
              <div className="symbol-choices">
                {PRESET_SYMBOLS.map((s) => (
                  <button
                    key={"p1-" + s}
                    className={`symbol-btn ${player1Symbol === s ? "active" : ""}`}
                    disabled={symbolsLocked}
                    onClick={() => {
                      if (symbolsLocked) return;
                      if (s === player2Symbol) return;
                      setPlayer1Symbol(s);
                    }}
                  >
                    {s}
                  </button>
                ))}

                <input
                  className="symbol-custom"
                  placeholder="Custom"
                  disabled={symbolsLocked}
                  value={customSymbol1}
                  onChange={(e) => setCustomSymbol1(e.target.value)}
                />

                <button
                  className="symbol-apply"
                  disabled={symbolsLocked}
                  onClick={() => {
                    if (symbolsLocked) return;
                    if (customSymbol1.trim() && customSymbol1.trim() !== player2Symbol)
                      setPlayer1Symbol(customSymbol1.trim());
                    setCustomSymbol1("");
                  }}
                >
                  Use
                </button>
              </div>
            </div>

            {/* PLAYER 2 */}
            <div className="player-block">
              <label className="label">Player 2 Name</label>
              <input
                className="text-input"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Player 2"
              />

              <label className="label">Symbol</label>
              <div className="symbol-choices">
                {PRESET_SYMBOLS.map((s) => (
                  <button
                    key={"p2-" + s}
                    className={`symbol-btn ${player2Symbol === s ? "active" : ""}`}
                    disabled={symbolsLocked}
                    onClick={() => {
                      if (symbolsLocked) return;
                      if (s === player1Symbol) return;
                      setPlayer2Symbol(s);
                    }}
                  >
                    {s}
                  </button>
                ))}

                <input
                  className="symbol-custom"
                  placeholder="Custom"
                  disabled={symbolsLocked}
                  value={customSymbol2}
                  onChange={(e) => setCustomSymbol2(e.target.value)}
                />

                <button
                  className="symbol-apply"
                  disabled={symbolsLocked}
                  onClick={() => {
                    if (symbolsLocked) return;
                    if (customSymbol2.trim() && customSymbol2.trim() !== player1Symbol)
                      setPlayer2Symbol(customSymbol2.trim());
                    setCustomSymbol2("");
                  }}
                >
                  Use
                </button>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="ttt-btn ghost"
              onClick={() => {
                setPlayer1Name("Player 1");
                setPlayer2Name("Player 2");
                setPlayer1Symbol("X");
                setPlayer2Symbol("O");
                resetBoard(true);
              }}
            >
              Reset Settings + Scores
            </button>

            <button className="ttt-btn ghost" onClick={() => setShowRules(true)}>
              Game Rules
            </button>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="ttt-controls">
          <div className="ttt-actions">
            <button className="ttt-btn" onClick={() => resetBoard(false)}>
              Restart
            </button>
            <button className="ttt-btn ghost" onClick={undo} disabled={!history.length}>
              Undo
            </button>
          </div>

          <div className="ttt-scores">
            <div className="pill">
              {player1Name}: <strong>{scores.p1}</strong>
            </div>
            <div className="pill">Draws: <strong>{scores.draws}</strong></div>
            <div className="pill">
              {player2Name}: <strong>{scores.p2}</strong>
            </div>
          </div>
        </div>

        {/* BOARD */}
        <main className="ttt-board-wrap" ref={boardWrapRef}>
          <div className="ttt-board">
            {board.map((cell, i) => {
              const isWinning = result?.line?.includes(i);
              return (
                <button
                  key={i}
                  className={`ttt-cell ${isWinning ? "ttt-win" : ""}`}
                  onClick={() => handleClick(i)}
                  ref={(el) => (cellRefs.current[i] = el)}
                >
                  {cell}
                </button>
              );
            })}
          </div>

          <svg className="ttt-line-svg">{linePath && <path d={linePath} className="ttt-line" fill="none" />}</svg>
        </main>

        
        <div className="ttt-footer">
          <div className="ttt-status">
            {result ? (result.winner ? `${playerLabel(result.winner)} wins!` : "Draw") : `Turn: ${xIsNext ? player1Name : player2Name} (${currentSymbol()})`}
          </div>
        </div>
      </div>

      {/* Winner Overlay */}
      {result && (
        <div className="winner-overlay">
          <div className="winner-card">
            <h2 className="winner-title">{result.winner ? `${playerLabel(result.winner)} wins!` : "It's a Draw!"}</h2>

            <div className="winner-actions">
              <button className="ttt-btn" onClick={() => resetBoard(false)}>
                Play Again
              </button>
              <button
                className="ttt-btn ghost"
                onClick={() => {
                  setScores({ p1: 0, p2: 0, draws: 0 });
                  resetBoard(true);
                }}
              >
                Reset Scores
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rules */}
      {showRules && (
        <div className="rules-overlay">
          <div className="rules-card">
            <h2 className="rules-title">Game Rules</h2>
            <ul className="rules-list">
              <li>{player1Name} goes first.</li>
              <li>Players take turns placing their symbol.</li>
              <li>Three in a row wins.</li>
              <li>If grid is full → Draw.</li>
            </ul>
            <button className="ttt-btn" onClick={() => setShowRules(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
