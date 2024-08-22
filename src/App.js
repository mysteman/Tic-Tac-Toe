//import logo from './logo.svg';
import React, {useState } from 'react';
import './App.css';

function App() {
  //initialize state for button values and total tap count
  const[buttonValues, setButtonValues]= useState(Array(9).fill(null));
  const[tapCount, setTapCount] = useState(0);
  const[isGridDisabled,setGridDisabled] =useState(false);
  const characters=['X','O'];
  const currentplayer=characters[tapCount%2];
  // handle button click
  const handleButtonClick = (index) =>{
    //set the value based on whether tapcount is odd or even
    const newValues= [...buttonValues];
    newValues[index] = characters[tapCount%2];

    //update state
    setButtonValues(newValues);
    setTapCount(tapCount+1);
    checkResult(newValues);
  };
  const checkResult=(Values) =>{
    const winningCombinations =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let combo of winningCombinations)
    {
      const [a,b,c]=combo;
      if(Values[a] && Values[a]===Values[b] && Values[a]===Values[c])
      {
        setGridDisabled(true);
        break;
      }
    } 
  };
  // Function to create a 3x3 grid
  const createGrid = () => {
    return buttonValues.map((value,index)=> (
    
          <button 
            key={index}
            className="square"
            onClick={()=> {
              handleButtonClick(index);
            }}
            
            disabled={value!==null || isGridDisabled} // disable button if its already marked
          >
            {value!==null ? value:""}
          </button>
      ));
  };
  
    return (
      <>
      <div className="heading">
      <h1>Tic-Tac-Toe Game</h1>
      </div>
      <div className="nextmove">
        {(isGridDisabled===true) ? `Winner is ${characters[(tapCount+1)%2]}` : `Next move : ${currentplayer}` }
      </div>
      <div className="container">
        <div className="grid-container">
        {createGrid()}
      </div>
      </div>
      </>
    );
}

export default App;
