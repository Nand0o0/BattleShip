import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square" 
      onClick={onSquareClick} 
      style={{ backgroundColor: value === null ? "darkblue" : "darkblue" }}
    >
      {value}
    </button>
  );
}

function Board({ squares, onPlay, startIndex }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextSquares[i] ? nextSquares[i] : "X";
    onPlay(nextSquares);
  }

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        border: "2px solid black",
        padding: "5px",
      }}
    >
      {Array(10).fill(null).map((_, row) => (
        <div key={row} style={{ display: "flex", gap: "5px" }}>
          {Array(10).fill(null).map((_, col) => {
            const index = startIndex + row * 3 + col;
            return (
              <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div 
      style={{ 
        display: "block", 
        height: "512px",
        width: "252px",
        margin: "100px auto",
        padding: "20px",
        background: "darkblue",
         // Centers boards horizontally
      }}
    >
      {/* 3 separate boards representing different sections of the game */}
      <Board squares={currentSquares} onPlay={handlePlay} startIndex={0} />
      <Board squares={currentSquares} onPlay={handlePlay} startIndex={10} />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
