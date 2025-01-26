import Cell from './models/Cell';
import Boat from './models/Boat';

export function getInitialState() {
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

export function doesTheHitSinkABoat(gridCells, boatFleet, row, col) {
    let hitCell = gridCells.find((cell) => cell.row === row && cell.col === col);

    if (hitCell.boatId === 0) {
        return false;
    }

    let currentBoat = boatFleet.find((boat) => boat.boatId === hitCell.boatId);

    let numOfCellsHitInThisBoat = 0;
    let currentCell;

    if (currentBoat.direction === 'x') {
        for (let i = 0; i < currentBoat.boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === currentBoat.startRow && cell.col === currentBoat.startCol + i);
    
            if (currentCell.isClicked) {
                numOfCellsHitInThisBoat++;
            }
        }   
    } else {
        for (let i = 0; i < currentBoat.boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row === currentBoat.startRow + i && cell.col === currentBoat.startCol);
    
            if (currentCell.isClicked) {
                numOfCellsHitInThisBoat++;
            }
        }
    }

    if (numOfCellsHitInThisBoat === currentBoat.boatSize) {
        return true;
    }

    return false;
}

export function doesTheHitWinTheGame(boatFleet, clickCount, maxNumberOfClicks){
    let numOfBoatsSunk = 0;

    for (let boat of boatFleet) {
        if (boat.isSunk) {
            numOfBoatsSunk++;
        }
    }

    if (numOfBoatsSunk === 4 && clickCount <= maxNumberOfClicks) {
        return true;
    }

    return false;
}


