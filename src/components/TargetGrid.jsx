import GridCell from './GridCell';

function TargetGrid() {
  
  const gridCells = getTargetGrid();


  for (let boatSize = 5; boatSize > 1; boatSize--) {
    setBoat(boatSize);
  }

  function setBoat(boatSize) {

    // let randomCellLetterIndex = Math.floor(Math.random() * 10);
    // let randomCellNumber = Math.floor(Math.random() * 10) + 1;
    // let randomCellName = letters[randomCellLetterIndex] + randomCellNumber;
    // let randomCellIndex = gridCells.findIndex((cell) => cell.name === randomCellName);

    let direction = Math.floor(Math.random() * 2); 
    let boatIsValid = false;
    while (!boatIsValid) {
      const [row, column] = getStartingCell(direction, boatSize);
      let rowIndex = lettersToIndex(row);
      let columnIndex = column - 1;

      boatIsValid = checkValidity(rowIndex, columnIndex, boatSize, direction);
    }

    // buildBoat(row + column, direction, boatSize);

    // setCellsToUnavailable();

  }

  function getStartingCell(direction, boatSize) {

    let randomColumn;
    let randomRow;
  
    if(direction === 'x') {
      randomColumn = Math.floor(Math.random() * (11 - boatSize)) + 1; //11, not 10, because the columns deal with index + 1.
      randomRow = toLetters(Math.floor(Math.random() * 10));
      // get row in index???
    } else {
      randomColumn = Math.floor(Math.random() * 10) + 1; 
      randomRow = toLetters(Math.floor(Math.random() * (11 - boatSize)));
    }
  
    return [randomRow, randomColumn];
  
  }

  function checkValidity(rowIndex, columnIndex, boatSize, direction) {
    const cellsToCheck = toCheckArray(rowIndex, columnIndex, boatSize, direction);

    for (let i = 0; i < cellsToCheck.length; i++) {
      if (!(cellsToCheck[i].isAvailableForBoat)) {
        return false;
      }
    }

    return true;
  }


  function toCheckArray(rowIndex, columnIndex, boatSize, direction) {

    const returnArray = [];
    let outterIncrement = (direction === 'x' ? 10 : 1);
    let innerIncrement = (direction === 'x' ? 1 : 10);
  
    const isUpperEdge = rowIndex === 0;
    const isLeftEdge = columnIndex === 1;
  
    let startingRow = (isUpperEdge ? rowIndex : rowIndex - 1);
    let startingColumn = (isLeftEdge? columnIndex : columnIndex - 1);
  
    let outterCounter;
    let innerCounter;
  
    let rowIndexToAdd = (direction === 'x'? innerCounter : outterCounter);
    let columnIndexToAdd = (direction === 'x' ? outterCounter : innerCounter);
  
    let boatLength = (isUpperEdge || isLeftEdge ? boatSize + 1 : boatSize + 2);
    let boatWidth = (isUpperEdge || isLeftEdge ? 2 : 3);
  
    let outterRange = (direction === 'x' ? boatWidth : boatLength);
    let innerRange = (direction === 'x' ? boatLength : boatWidth);
  
  
  
    for (outterCounter = startingColumn; outterCounter < outterRange; outterCounter + outterIncrement) {
      for (innerCounter = startingRow; innerCounter < innerRange; innerCounter + innerIncrement) {
        returnArray.push(gridCells[rowColIndexToCellIndex(rowIndexToAdd, columnIndexToAdd)]);
      }
    }
  
    return returnArray;
  }

  

  function buildBoat(cellId, direction, boatSize) {
    const boatArray = [];
    const startingCellIndex = cellIdToIndex(cellId);
    const increment = (direction === 'x' ? 1 : 10);

    for (let i = startingCellIndex; i < boatSize; i += increment) {
      gridCells[i].waterOrBoat = 'boat';
      boatArray.push(gridCells[i]);
    }

  }



  return <div className="target-grid">
    {gridCells.map((cell) => <GridCell key={cell.id} name={cell.id} waterOrBoat={cell.waterOrBoat}></GridCell>)}
  </div>;
}

function toLetters(rowIndex) {
  const letters = ['a','b','c','d','e','f','g','h','i','j'];
  return letters[rowIndex];
}

function lettersToIndex(rowLetter) {
  const letters = ['a','b','c','d','e','f','g','h','i','j'];
  return letters.findIndex((a) => a === rowLetter);
}

function cellIdToIndex(cellId) {
  const indexOfCell = gridCells.findIndex((cell) => cell.id === cellId);
  return indexOfCell;
}

function rowColIndexToCellIndex(rowIndex, columnIndex) {
  const row = toLetters(rowIndex);
  const column = columnIndex + 1;

  const indexOfCell = cellIdToIndex(row + column);
  return indexOfCell;

}

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

export default TargetGrid;