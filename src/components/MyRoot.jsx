import { useState, useEffect } from 'react';
import TargetGrid from './TargetGrid';
import Header from './Header';
import Cell from '../models/Cell';
import getInitialState from '../util';


function MyRoot() {
const [clickCount, setClickCount] = useState(0);
const [gridCells, setGridCells] = useState([]);
const [boatFleet, setBoatFleet] = useState([]);

useEffect(()=> {
  const [theGrid, theFleet] = getInitialState();
  setGridCells(theGrid);
  setBoatFleet(theFleet);
}, []);


const onCellClick = (row, col) => {
  let currentClickCount = clickCount + 1;
  setClickCount(currentClickCount);
  console.log('clickCount=', clickCount, row, col);
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
console.log('len of tempGrid', tempGridCells.length);

  setGridCells(tempGridCells);
}

  return (
    <div className="my-root">
      <Header clickCount={clickCount} />
      <TargetGrid onCellClick={onCellClick} gridCells={gridCells} />
    </div>
  );
}

export default MyRoot;
