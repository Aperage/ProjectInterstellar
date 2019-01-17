
/** Class representing a game state. */
export class GameState {

    playHistory: any;
    board: any;
    player: any;

    constructor(playHistory: any, board: any, player: any) {
        this.playHistory = playHistory;
        this.board = board;
        this.player = player;
    }

    isPlayer(player: any) {
        return (player === this.player);
    }

    hash() {
        return JSON.stringify(this.playHistory);
    }

    // Note: If hash uses board, multiple parents possible
}
