import GridCell from './GridCell';

function TargetGrid({onCellClick, gridCells}) {
    const gridCellMap = gridCells.map((cell) => {
        const cellId = `${cell.row}-${cell.col}`;
        return <GridCell key={cellId} cell={cell} onCellClick={onCellClick} />
    });
    
    return (
        <div className="target-grid">
            {gridCellMap}
        </div>
    );
}

export default TargetGrid;
