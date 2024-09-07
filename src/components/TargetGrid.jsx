import GridCell from './GridCell';
// import './Utilities';

function TargetGrid() {
  
  const gridCells = getTargetGrid();


  // for (let boatSize = 5; boatSize > 1; boatSize--) {
  //   setBoat(boatSize, gridCells);
  // }

  return <div className="target-grid">
    {gridCells.map((cell) => <GridCell key={cell.id} name={cell.id} waterOrBoat={cell.waterOrBoat}></GridCell>)}
  </div>;
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



function toLetters(rowIndex) {
  const letters = ['a','b','c','d','e','f','g','h','i','j'];
  return letters[rowIndex];
}




export default TargetGrid;