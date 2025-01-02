export default class Cell {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.boatId = 0;
    }

    setBoatId(boatId) {
        this.boatId = boatId;
    }


  }