


const gridCells = getTargetGrid();

function getTargetGrid() {
  const gridCells = [];
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      const idName = toLetters(i - 1) + j;
      gridCells.push({id: idName, waterOrBoat: "water", isAvailableForBoat: true});
    }
  }
  return gridCells;
}



function toLetters(rowIndex) {
  const letters = ['a','b','c','d','e','f','g','h','i','j'];
  return letters[rowIndex];
}


for (let boatSize = 5; boatSize > 1; boatSize--) {
  setBoat(boatSize, gridCells);
}

function setBoat(boatSize, gridCells) {

  console.log('boatSize ', boatSize);

  let direction = getDirection();
  console.log('direction ', direction);

  let boatIsValid = false;


  // it would be a lot better to use the length of available cells to control this loop, but i dont know how to do this with the const assignment thing...
  while (!boatIsValid) {

    let randomRowOrColumn = getRandomRowOrColumn(); // in index
    console.log('random row or column ', randomRowOrColumn);
    const arrayOfRowOrColumn = getArrayOfRowOrColumn(direction, randomRowOrColumn, gridCells); // in index, deal with gridCells later. also, const or let?
    console.log('array of row or column ', arrayOfRowOrColumn);
    const availableCells = getAvailableCells(arrayOfRowOrColumn, boatSize, direction); // const or let?
    console.log('available cells length', availableCells.length);


    if (availableCells.length > 0) {
      const chosenBoat =  chooseTheBoat(availableCells, boatSize);
      console.log('this is the chosen boat ', chosenBoat);
      buildTheBoat(chosenBoat);
      makeProperCellsUnavailable(gridCells, randomRowOrColumn, chosenBoat[0], boatSize, direction);
      boatIsValid = true;
    }

  }

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


function getRandomRowOrColumn() {
  let random = Math.floor(Math.random() * 10);
  return random;
}


function getArrayOfRowOrColumn(direction, rowOrColumn, gridCells) {
  const rowOrColumnArray = [];

  for (let i = 0; i < 10; i++) {

    if (direction === 'x') {
      rowOrColumnArray.push(gridCells[(rowOrColumn * 10) + i]); // just think a bit... look at the grid with the indexes :)
    } else {
      rowOrColumnArray.push(gridCells[rowOrColumn + (i * 10)]); // same as above :)
    } 

  }

  return rowOrColumnArray;

}


function getAvailableCells(arrayOfRowOrColumn, boatSize, direction) {

  // const nestedArraysOfAvailableRanges = []; // this is going to be an array of arrays
  const singleArrayOfAvailableRanges = getSingleArrayOfAvailableRanges(arrayOfRowOrColumn).filter((boat) => boat != null); // this comes before the nested one
  console.log('single array of available ranges', singleArrayOfAvailableRanges);


  const nestedArraysOfAvailableRanges = getNestedArraysOfAvailableRanges(singleArrayOfAvailableRanges, direction).filter((array) => array.length >= boatSize);

  console.log('nested array of available ranges', nestedArraysOfAvailableRanges);


  return nestedArraysOfAvailableRanges;

}

function getSingleArrayOfAvailableRanges(arrayOfRowOrColumn) {
  
  const returnSingleArray = [];
  const tempBooleanArrayOfAvailableCells = []; 

  for (let i = 0; i < 10; i++) {
    tempBooleanArrayOfAvailableCells.push(arrayOfRowOrColumn[i].isAvailableForBoat);
  }

  for (let i = 0; i < 10; i++) {
    if (tempBooleanArrayOfAvailableCells[i]) {
      returnSingleArray.push(arrayOfRowOrColumn[i]);
    } else {
      returnSingleArray.push(null);
    }
  }

  return returnSingleArray;

}

function getNestedArraysOfAvailableRanges(singleArrayOfAvailableRanges, direction) {

  const returnNestedArray = [];

  let outterIndex = 0;
  let innerIndex = 0;


  for(let i = 0; i < singleArrayOfAvailableRanges.length - 1; i++) {
    if (isThisBoatImmediatelyBeforeThisOther(singleArrayOfAvailableRanges[i], singleArrayOfAvailableRanges[i+1], direction)) {
      returnNestedArray[outterIndex][innerIndex] = singleArrayOfAvailableRanges[i];
      outterIndex++;
      innerIndex = 0;

      // If this is the last iteration, and it is the case that the second last is not one less than the last, so this. Can't have another iteration, since i+1 would be out of bounds.
      if (i = singleArrayOfAvailableRanges.length - 2) {
        returnNestedArray[outterIndex][innerIndex] = singleArrayOfAvailableRanges[i];
      }
    } else {
      returnNestedArray[outterIndex][innerIndex] = singleArrayOfAvailableRanges[i];
      innerIndex++;
    }
  }

  return returnNestedArray;
}

function isThisBoatImmediatelyBeforeThisOther(boatOne, boatTwo, direction) {
  let returnBoolean;
  if (direction == 'x') {
    returnBoolean =  cellIdToColIndex(boatOne.id) + 1 == cellIdToColIndex(boatTwo.id);
  } else {
    returnBoolean =  cellIdToRowIndex(boatOne.id) + 1 == cellIdToRowIndex(boatTwo.id);
  }

  return returnBoolean;

}



function chooseTheBoat(availableCells, boatSize){
  let boatArrayIndex = Math.floor(Math.random() * availableCells.length);
  const chosenBoatRange = availableCells[boatArrayIndex];
  let randomStart;

  if (chosenBoatRange.length === boatSize) {
    return chosenBoatRange;
  } else {
    randomStart = Math.floor(Math.random() * (chosenBoatRange.length - boatSize + 1)); // to make sure it starts in a cell where there are enough cells to the left for the boat size
    return chosenBoatRange.slice(randomStart, randomStart + boatSize);
  }
  
}

function buildTheBoat(chosenBoat) {
  for (let cell of chosenBoat) {
    cell.isAvailableForBoat = false;
    cell.waterOrBoat = 'boat';
  }

}

function makeProperCellsUnavailable(gridCells, randomRowOrColumn, firstBoatCell, boatSize, direction) {

  const indexOfFirstBoatCellOnRowOrColumn = direction === 'x'? cellIdToColIndex(firstBoatCell.id) : cellIdToRowIndex(firstBoatCell.id);
  console.log('index of first boat cell on row or column ', indexOfFirstBoatCellOnRowOrColumn);


  const beforeRowOrColumn = getArrayOfRowOrColumn(direction, randomRowOrColumn - 1, gridCells);
  const beforeRowOrColumnOfBoat = beforeRowOrColumn.slice(indexOfFirstBoatCellOnRowOrColumn, indexOfFirstBoatCellOnRowOrColumn + boatSize);
  makeArrayUnavailable(beforeRowOrColumnOfBoat);
  
  const afterRowOrColumn = getArrayOfRowOrColumn(direction, randomRowOrColumn + 1, gridCells);
  const afterRowOrColumnOfBoat = afterRowOrColumn.slice(indexOfFirstBoatCellOnRowOrColumn, indexOfFirstBoatCellOnRowOrColumn + boatSize); 
  makeArrayUnavailable(afterRowOrColumnOfBoat);

  

  const openingEdge = getOpeningEdge(direction, firstBoatCell);
  const closingEdge = getClosingEdge(direction, firstBoatCell);

}

function makeArrayUnavailable(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].isAvailableForBoat = false;
  }

}

// function getOpeningEdge(direction, firstBoatCell) {
//   const openingEdge = direction === 'x' ?  

// }

// function getClosingEdge(direction, firstBoatCell) {

// }






// // Duplicated!
// function toLetters(rowIndex) {
//   const letters = ['a','b','c','d','e','f','g','h','i','j'];
//   return letters[rowIndex];
// }

function lettersToIndex(rowLetter) {
  const letters = ['a','b','c','d','e','f','g','h','i','j'];
  return letters.findIndex((a) => a === rowLetter);
}

// function cellIdToIndex(cellId) {
//   const indexOfCell = gridCells.findIndex((cell) => cell.id === cellId);
//   return indexOfCell;
// }

function cellIdToColIndex(cellId) {
  const returnIndex = cellId[1] - 1;
  return returnIndex;
}

function cellIdToRowIndex(cellId) {
  const returnIndex = lettersToIndex(cellId[0]);
  return returnIndex;
}


export default Utilities;