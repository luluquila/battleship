import { useState } from 'react'

function GridCell({name, boatId}) {
// Proper one
  const waterOrBoat = boatId === 0 ? 'water' : 'boat';
  const [cellDisplay, setWaterOrBoat] = useState('grid-cell');
  const [hitMark, setHitMark] = useState(name); 
  
//Temporary
  // const waterOrBoat = boatId === 0 ? 'water' : 'boat';
  // const cellDisplay = 'grid-cell';
  // let hitMark;

//Temporary
  // if (waterOrBoat === "boat") {
  //   hitMark = 'X';
  // } else if (waterOrBoat === "water") {
  //   hitMark = '~';
  // }


// Proper one
  const onClickHandle = () => {
    setWaterOrBoat(`grid-cell-${waterOrBoat}`);
    setHitMark(waterOrBoat === 'boat' ? 'X' : '.');
  }


//Temporary
  // return <div className={cellDisplay}>
  //   {hitMark}
  //   </div>;


// Proper one
  return <div className={cellDisplay} onClick={onClickHandle}>
    {hitMark}
    </div>;

}

export default GridCell;