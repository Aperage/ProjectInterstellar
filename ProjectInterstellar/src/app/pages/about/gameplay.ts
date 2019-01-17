'use strict';

/** Class representing a state transition. */
export class GamePlay {

    row: any = false;
    col: any = false;

    constructor(row: any, col: any) {
        this.row = row;
        this.col = col;
    }

    hash() {
        return this.row.toString() + "," + this.col.toString();
    }
}
