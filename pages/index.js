import { useState } from "react";
import styles from "../styles/styles.module.css";

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isTie(board) {
  return board.filter((cell) => cell === "").length === 0;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");

  function handleClick(index) {
    if (board[index] === "" && !calculateWinner(board)) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setPlayer("X");
  }

  return (
    <div>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <div key={index} className={styles.cell} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className={styles.status}>
        {calculateWinner(board) ? 'Winner:' + calculateWinner(board) : isTie(board) ? "Tie Game" : 'Next player:' + player}
      </div>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

