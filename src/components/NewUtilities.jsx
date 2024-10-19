
const gridCells = getTargetGrid();

function getTargetGrid() {
  const gridCells = [];
  for (let row = 1; row < 11; row++) {
    for (let col = 1; col < 11; col++) {
      gridCells.push({id: 0, row: row, col: col, isAvailableForBoat: true});
    }
  }
  return gridCells;
}


for (let boatSize = 5; boatSize > 1; boatSize--) {
  setBoat(boatSize, gridCells);
}



function setBoat(boatSize, gridCells) {

  console.log('boatSize ', boatSize);

  let isBoatPossible = false;
  let direction;
  let randomRow;
  let randomCol;


  // it would be a lot better to use the length of available cells to control this loop, but i dont know how to do this with the const assignment thing...
  while (!isBoatPossible) {

    direction = getDirection();
    console.log('direction ', direction);

    randomRow = getRandomRow(direction, boatSize); // in index
    console.log('random row', randomRow);

    randomCol = getRandomCol(direction, boatSize);
    console.log('random col', randomCol);

    isBoatPossible = isBoatPossible(randomRow, randomCol, direction, boatSize, gridCells);

  }

  buildTheBoat(randomRow, randomCol, direction, boatSize, gridCells);
  makeBeforeArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells); //along the length of the boat
  makeAfterArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells); // same
  makeTopArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells); // three cells
  makeBottomArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells); // same


}


function getDirection() {
  let dir = Math.floor(Math.random() * 2); 
  if (dir === 0) {
    dir = 'x';
  } else {
    dir = 'y';
  }

  return dir;
}

function getRandomRow(direction, boatSize) {
    let randomRow;

    if (direction == 'y') {
        randomRow = Math.floor(Math.random() * (11 - boatSize)) + 1; // up until an index which allows the boat to fit in the col, before edge
    } 
    randomRow = Math.floor(Math.random() * 10) + 1;

    return randomRow;

}

function getRandomCol(direction, boatSize) {
    let randomCol;
    
    if (direction == 'x') {
        randomCol = Math.floor(Math.random() * (11 - boatSize)) + 1; // same, but for row
    } 
    randomCol = Math.floor(Math.random() * 10) + 1;

    return randomCol;
}

function isBoatPossible(randomRow, randomCol, direction, boatSize, gridCells) {

    let currentCell;

    if (direction == 'x') {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row == randomRow + i && cell.col == randomCol);
    
            if (!(currentCell.isAvailableForBoat)) {
                return false;
            }
        }
        
    } else {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row == randomRow && cell.col == randomCol + i);
    
            if (!(currentCell.isAvailableForBoat)) {
                return false;
            }
        }
    }

    return true;  

}



function buildTheBoat(randomRow, randomCol, direction, boatSize, gridCells) {
    let currentCell;

    if (direction == 'x') {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row == randomRow  && cell.col == randomCol + i);
            currentCell.isAvailableForBoat = false;
            currentCell.id = boatSize;
    
        }
        
    } else {
        for (let i = 0; i < boatSize; i++) {
            currentCell = gridCells.find((cell) => cell.row == randomRow + i && cell.col == randomCol);
            currentCell.isAvailableForBoat = false;
            currentCell.id = boatSize;
    
        }
    }
  
}



function makeBeforeArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells) {
    let currentCell;
    let isUpperOrLeftEdge;
    

    if (direction == 'x') {
        isUpperOrLeftEdge = randomRow == 1;
        if (!isUpperOrLeftEdge) {
            for (let i = 0; i < boatSize; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow - 1 && cell.col == randomCol + i);
                currentCell.isAvailableForBoat = false;
        
            }
        }
        
        
    } else {
        isUpperOrLeftEdge = randomCol == 1;
        if (!isUpperOrLeftEdge) {
            for (let i = 0; i < boatSize; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow + i && cell.col == randomCol - 1);
                currentCell.isAvailableForBoat = false;
        
            }

        }
        
    }

}

function makeAfterArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells) {
    let currentCell;
    let isBottomOrRightEdge;

    if (direction == 'x') {
        isBottomOrRightEdge = randomRow == 10;
        if (!isBottomOrRightEdge) {
            for (let i = 0; i < boatSize; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow + 1 && cell.col == randomCol + i);
                currentCell.isAvailableForBoat = false;
        
            }
        }
        
        
    } else {
        isBottomOrRightEdge = randomCol == 10;
        if (!isBottomOrRightEdge) {
            for (let i = 0; i < boatSize; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow + i && cell.col == randomCol + 1);
                currentCell.isAvailableForBoat = false;
        
            }

        }
        
    }


}
// The problem here is that, to check corners properly, we need to know if these are edges in the length of the boat. We would nee to pass info from the functions above, or recheck it, or do it in main.

function makeTopArrayUnavailable(randomRow, randomCol, direction, boatSize, gridCells) {
    let currentCell;
    let isTopOrLeft;

    if (direction == 'x') {
        isTopOrLeft = randomCol == 1;
        if (!isTopOrLeft) {
            for (let i = -1; i < 2; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow + i && cell.col == randomCol - 1);
                currentCell.isAvailableForBoat = false;
        
            }
        }
        
        
    } else {
        isTopOrLeft = randomRow == 1;
        if (!isTopOrLeft) {
            for (let i = -1; i < 2; i++) {
                currentCell = gridCells.find((cell) => cell.row == randomRow - 1 && cell.col == randomCol + i);
                currentCell.isAvailableForBoat = false;
        
            }

        }
        
    }

}

