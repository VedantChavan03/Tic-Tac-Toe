import { useState } from "react";
import "./App.css";

function Square({ value, Click }) {
  // function Click() {
  //   if(value!= "X" && value!= "O"){

  //       if(turn==="X"){
  //           setValue("X");
  //           // setTurn("O");
  //         } else {
  //             setValue("O");
  //             // setTurn("X");
  //           }
  //         }
  //         }
  return (
    <button className="square" onClick={Click}>
      {value}&nbsp;
    </button>
  );
}

export default function Board() {
  const [turn, setTurn] = useState("X");
  const [value, setValue] = useState(" ");
  const [square, setSquare] = useState(Array(9).fill(null));
  // function onClick(){
  //   if(turn==="X"){
  //     setTurn("O");
  // } else {
  //     setTurn("X");
  // }
  // }

  function Click(i) {
    const newSquares = square.slice();
    if (square[i] === null) {
      if (turn === "X") {
        newSquares[i] = "X";
        setTurn("O");
      } else if (turn === "O") {
        newSquares[i] = "O";
        setTurn("X");
      }
    }
    setSquare(newSquares);
  }
  let status;
  const winner = findWinner(square);
  if (winner) {
    status = "Winner: " + winner;
    stopGame(square);
  } else if (boardFilled(square)) {
    status = "Draw";
  } else {
    status = "Your turn: " + turn;
  }
  function reset(square){
    const newSquares= square.slice()
    for (let i = 0; i < 9; i++) {
      newSquares[i]= null;
    }
    setSquare(newSquares)
    setTurn('X')
  }
  return (
    <div className="display">
      <div className="board marginLeft">
        <div>
          <Square value={square[0]} Click={() => Click(0)} />
          <Square value={square[1]} Click={() => Click(1)} />
          <Square value={square[2]} Click={() => Click(2)} />
        </div>
        <div>
          <Square value={square[3]} Click={() => Click(3)} />
          <Square value={square[4]} Click={() => Click(4)} />
          <Square value={square[5]} Click={() => Click(5)} />
        </div>
        <div>
          <Square value={square[6]} Click={() => Click(6)} />
          <Square value={square[7]} Click={() => Click(7)} />
          <Square value={square[8]} Click={() => Click(8)} />
        </div>
      </div>
      <div
        className="status"
        // style={{
        //   backgroundColor:
        //     status == "Winner: X" || "Winner: O"
        //       ? "pink"
        //       : status == "Your turn: X" || "Your turn: O"
        //       ? "whitesmoke"
        //       : status == "Draw"
        //       ? "lightgreen"
        //       // : "lightgreen"),
        //       : "blue"
        // }}
      >
        {status}
      </div>
      <div><button className="square reset" onClick={() => reset(square)}>RESET</button></div>
    </div>
  );
}

function findWinner(square) {
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

function boardFilled(square) {
  for (let i = 0; i < 9; i++) {
    if (square[i] === null) return null;
  }
  return "Draw";
}

function stopGame(square) {
  for (let i = 0; i < 9; i++) {
    if (square[i] === null) square[i] = " ";
  }
}
