


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
    const availableCells = getAvailableCells(arrayOfRowOrColumn, boatSize); // const or let?
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


function getAvailableCells(arrayOfRowOrColumn, boatSize) {

  // const nestedArraysOfAvailableRanges = []; // this is going to be an array of arrays
  const singleArrayOfAvailableRanges = getSingleArrayOfAvailableRanges(arrayOfRowOrColumn); // this comes before the nested one
  console.log('single array of available ranges', singleArrayOfAvailableRanges);


  const nestedArraysOfAvailableRanges = getNestedArraysOfAvailableRanges(singleArrayOfAvailableRanges).filter((array) => array.length >= boatSize);

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

function getNestedArraysOfAvailableRanges(singleArrayOfAvailableRanges) {
  const returnNestedArray = [];

  const indexesOfNulls = [];


  for (let i = 0; i < 10; i++) {
    if (singleArrayOfAvailableRanges[i] === null) {
      indexesOfNulls.push(i);
    }
  }

  if(singleArrayOfAvailableRanges[0] != null && indexesOfNulls.length != 0) {
    returnNestedArray.push(singleArrayOfAvailableRanges.slice(0, indexesOfNulls[0]));
  }

  for (let index = 1; index < indexesOfNulls.length; index++) {
    returnNestedArray.push(singleArrayOfAvailableRanges.slice(indexesOfNulls[index - 1] + 1, indexesOfNulls[index]));
  }

  console.log('here', indexesOfNulls[indexesOfNulls.length - 1]);

  returnNestedArray.push(singleArrayOfAvailableRanges.slice(indexesOfNulls[indexesOfNulls.length - 1] + 1));

  console.log('return nested array ', returnNestedArray);

  return returnNestedArray;

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

  const beforeRowOrColumn = getArrayOfRowOrColumn(direction, randomRowOrColumn - 1, gridCells);
  const indexOfFirstBoatCellOnRowOrColumn = direction === 'x'? cellIdToRowIndex(firstBoatCell.id) : cellIdToColIndex(firstBoatCell.id);
  console.log('index of first boat cell on row or column ', indexOfFirstBoatCellOnRowOrColumn);

  
  // beforeRowOrColumn.filter((cell) => )
  const afterRowOrColumn = getArrayOfRowOrColumn(direction, randomRowOrColumn + 1, gridCells);

  // nestedArraysOfAvailableRanges.filter((array) => array.length >= boatSize);
}






















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