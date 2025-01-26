export default class Boat {
    constructor(boatId, boatSize) {
        this.startRow = 0;
        this.startCol = 0;
        this.direction = 'x';
        this.boatId = boatId;
        this.boatSize = boatSize;
        this.isSunk = false;
    }

    updateBoat(startRow, startCol, direction) {
        this.startRow = startRow;
        this.startCol = startCol;
        this.direction = direction;
    }

    sinkBoat(){
        this.isSunk = true;
    }

}

