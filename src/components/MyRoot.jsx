import { useState, useEffect } from 'react';
import TargetGrid from './TargetGrid';
import Header from './Header';
import Cell from '../models/Cell';
import Boat from '../models/Boat';
import FleetContainer from './FleetContainer';
import { getInitialState, doesTheHitSinkABoat, doesTheHitWinTheGame} from '../util';


function MyRoot() {
const [clickCount, setClickCount] = useState(0);
const [gridCells, setGridCells] = useState([]);
const [boatFleet, setBoatFleet] = useState([]);
const maxNumberOfClicks = 70;

useEffect(()=> {
  const [theGrid, theFleet] = getInitialState();
  setGridCells(theGrid);
  setBoatFleet(theFleet);
}, []);


const onCellClick = (row, col) => {
  let currentClickCount = clickCount + 1;
  setClickCount(currentClickCount);
  const tempGridCells = gridCells.map((cell) => {
    if (cell.row === row && cell.col === col) {
      const tempCell = new Cell(cell.row, cell.col);
      tempCell.setBoatId(cell.boatId);
      tempCell.clickCell();
      return tempCell;
    }
    return cell;
  }
  );

  setGridCells(tempGridCells);

  const isABoatSunk = doesTheHitSinkABoat(tempGridCells, boatFleet, row, col); //sending tempGridCells instead of gridCells because of async problem. In temp, the currentCell is immediately 'isClicked = true'.

  if (isABoatSunk) {
    const tempCell = gridCells.find((cell) => cell.row === row && cell.col === col);
    
    const tempBoatFleet = boatFleet.map((boat) => {
      if (boat.boatId === tempCell.boatId) {
        const tempBoat = new Boat(boat.boatId, boat.boatSize);
        tempBoat.updateBoat(boat.startRow, boat.startCol, boat.direction);
        tempBoat.sinkBoat();
        return tempBoat;
      }
      return boat;
    }
  );

  setBoatFleet(tempBoatFleet);

  let isTheGameWon = doesTheHitWinTheGame(tempBoatFleet, clickCount, maxNumberOfClicks); //Same reason as above. Also I had to put it inside this if statement to be able to use the tempBoatFleet.

  if (isTheGameWon) {
    console.log('You win!');
  }

  }

  

}

  return (
    <div className="my-root">
      <Header clickCount={clickCount} />
      <TargetGrid onCellClick={onCellClick} gridCells={gridCells} />
      <GameOver />
      <FleetContainer boatFleet={boatFleet} />
    </div>
  );
}

export default MyRoot;
