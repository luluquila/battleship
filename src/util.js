import Cell from './models/Cell';
import Boat from './models/Boat';

export default function getInitialState() {
    const theGrid = getTargetGrid();
    const boatFleet = getFleet();
    
    for (let boat of boatFleet) {
        const [startRow, startCol, direction] = getBoatPosition(boat.boatSize, theGrid);
        boat.updateBoat(startRow, startCol, direction);
        updateTargetGrid(boat, theGrid);
    }
    return [theGrid, boatFleet];
}

function getTargetGrid() {
  const gridCells = [];
  for (let row = 1; row < 11; row++) {
    for (let col = 1; col < 11; col++) {
      gridCells.push(new Cell(row, col));
    }
  }
  return gridCells;
}

function getFleet() {
  const boatFleet = [];
  let boatId = 1;
  for (let boatSize = 5; boatSize > 1; boatSize--) {
    boatFleet.push(new Boat(boatId, boatSize));
    boatId++;
  }
  return boatFleet;
}

function getBoatPosition(boatSize, gridCells) {
  let isBoatValid = false;
  let direction;
  let randomRow;
  let randomCol;

  while (!isBoatValid) {
    direction = getDirection();
    randomRow = getRandomRow(direction, boatSize); 
    randomCol = getRandomCol(direction, boatSize);
    isBoatValid = isBoatPossible(randomRow, randomCol, direction, boatSize, gridCells);
  }

  return [randomRow, randomCol, direction];
}

function getDirection() {
  return Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
}

function getRandomRow(direction, boatSize) {
    let randomRow;

    if (direction == 'y') {
        randomRow = Math.floor(Math.random() * (11 - boatSize)) + 1; // up until an index which allows the boat to fit in the col, before edge
    } else {
      randomRow = Math.floor(Math.random() * 10) + 1;
    }

    return randomRow;
}

function getRandomCol(direction, boatSize) {
    let randomCol;
    
    if (direction == 'x') {
        randomCol = Math.floor(Math.random() * (11 - boatSize)) + 1; // same, but for row
    } else {
        randomCol = Math.floor(Math.random() * 10) + 1;
    }
    
    return randomCol;
}

function isBoatPossible(randomRow, randomCol, direction, boatSize, gridCells) {
    let currentCell;

    if (direction === 'x') {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === randomRow && cell.col === randomCol + i);
    
            if (currentCell.boatId !== 0) {
                return false;
            }
        }   
    } else {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === randomRow + i && cell.col === randomCol);
    
            if (currentCell.boatId !== 0) {
                return false;
            }
        }
    }

    return true;  
}

function updateTargetGrid(boat, gridCells) {
    let currentCell;

    if (boat.direction === 'x') {
        for (let i = 0; i < boat.boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === boat.startRow && cell.col === boat.startCol + i);
            currentCell.setBoatId(boat.boatId);
    
        }  
    } else {
        for (let i = 0; i < boat.boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === boat.startRow + i && cell.col === boat.startCol);
            currentCell.setBoatId(boat.boatId);
        }
    }
}