function GridCell({cell, onCellClick}) {
  let cellDisplay = 'grid-cell';
  let cellHitMark = '';

  if (cell.isClicked) {
    console.log('row', cell.row, ' col', cell.col);
    cellDisplay = cell.boatId === 0 ? 'grid-cell-water' : 'grid-cell-boat';
    cellHitMark = cell.boatId === 0 ? '' : 'X';
  }

  const onClickHandle = () => {
    if (cell.isClicked) {
      return;
    }
    onCellClick(cell.row, cell.col)

  }

  return (
    <div className={cellDisplay} onClick={onClickHandle}>
      {cellHitMark}
    </div>
  );

}

export default GridCell;