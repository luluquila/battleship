export default class Cell {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.boatId = 0;
      this.isClicked = false;
    }

    setBoatId(boatId) {
        this.boatId = boatId;
    }

    clickCell() {
        this.isClicked = true;
    }
  }