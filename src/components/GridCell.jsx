function GridCell({cell, onCellClick}) {
  let cellDisplay = 'grid-cell';
  let cellHitMark = '';

  if (cell.isClicked) {
    cellDisplay = cell.boatId === 0 ? 'grid-cell-water' : 'grid-cell-boat';
    cellHitMark = cell.boatId === 0 ? '' : 'X';
  }

  const onClickHandle = () => {
    if (cell.isClicked) { // This is here so that the counter doesnt increase when you clicked a cell that was already clicked.
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