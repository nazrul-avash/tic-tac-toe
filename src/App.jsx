import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
export function Square({value, onSquareClick}){
  
        return(
          <div>
            <button className='square' onClick={onSquareClick}>{value}</button>
            </div>
        );
  }



function Board({xIsNext,squares,onPlay}){
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSetOfSquares = squares.slice();
    if(xIsNext){
      nextSetOfSquares[i] ='X';
    }
    else {
      nextSetOfSquares[i] = 'O';
    }
    onPlay(nextSetOfSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status ="Winner" + winner;
  }
  else {
    status ="Next Player is: " + (xIsNext?"X":"O");
  }
  
  return(
    <>
    <div>
        <h1>{status}</h1>
      </div>
    <div className="board">
      
    <div >
      <Square  value={squares[0]} onSquareClick={() =>handleClick(0)} />
      <Square  value={squares[1] } onSquareClick={() =>handleClick(1)} />
      <Square  value={squares[2]} onSquareClick={() =>handleClick(2)} />
      
    </div>
    <div >
      <Square  value={squares[3]} onSquareClick={() =>handleClick(3)} />
      <Square  value={squares[4]} onSquareClick={() =>handleClick(4)}/>
      <Square  value={squares[5]} onSquareClick={() =>handleClick(5)}/>
      
    </div>
    <div >
      <Square  value={squares[6]} onSquareClick={() =>handleClick(6)}/>
      <Square  value={squares[7]} onSquareClick={() =>handleClick(7)}/>
      <Square  value={squares[8]} onSquareClick={() =>handleClick(8)}/>
      
    </div>
   
  
  
    </div>
    </>
  );
}
function Game(){
  
  
  const [records, setRecords] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext =  currentMove % 2 ===0;
  console.log("currentMove: "+currentMove);
  const currentRecords = records[currentMove]; 
  console.log("currentRecords: "+currentRecords);

  function handlePlay(nextSquares){
    const nextHistory = [...records.slice(0,currentMove+1),nextSquares];
    setRecords(nextHistory);
    setCurrentMove(nextHistory.length-1);
    
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
  const moves = records.map((squares,move) =>{
    let description;
    if (move>0){
      description = "Go to Move# " + move;
    }
    else{
      description = "Go to start";
    }
    return (<li><button onClick={()=>{jumpTo(move)}}>{description}</button></li>);

  });


  return(
    <div className='game'>
      <div>
      <Board squares={currentRecords} xIsNext = {xIsNext} onPlay= {handlePlay}  />
    </div>
    <div>
      <ol>{moves}</ol>
    </div>
    </div>

  );
}
function calculateWinner(squares){
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines){
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;

}

function App() {

  return (
    <Game/>
  )
}

export default App
