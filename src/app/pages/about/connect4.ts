
import { GameState } from "./gamestate";
import { GamePlay } from "./gameplay";

const N_ROWS = 6;
const N_COLS = 7;

const boardPrototype =   [ [0,0,0,0,0,0,0],
                           [0,0,0,0,0,0,0],
                           [0,0,0,0,0,0,0],
                           [0,0,0,0,0,0,0],
                           [0,0,0,0,0,0,0],
                           [0,0,0,0,0,0,0] ];

const checkPrototype = [ [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0] ];

// Class representing the game.
export class GameC4 {

  // Generate and return the initial game state.
  public start() {
    let newBoard = boardPrototype.map((row) => row.slice());
    return new GameState([], newBoard, 1);
  }


  // Advance the given state and return it.
  nextGameState(state: any, play: any) {
    let newHistory = state.playHistory.slice(); // 1-deep copy
    newHistory.push(play);
    let newBoard = state.board.map((row: any) => row.slice());
    newBoard[play.row][play.col] = state.player;
    let newPlayer = -state.player;

    return new GameState(newHistory, newBoard, newPlayer);
  }

  

  // Return the current player's legal plays from given state.
  legalPlays(state: any) {
    let legalPlays = [];
    for (let col = 0; col < N_COLS; col++) {
      for (let row = N_ROWS - 1; row >= 0; row--) {
        if (state.board[row][col] === 0) {
          legalPlays.push(new GamePlay(row, col));
          break;
        }
      }
    }
    return legalPlays;
  }


  
  // Return the winner of the game.
  winner(state: any) {

    // if board is full, there's no winner
    if (!isNaN(state.board[0].reduce(
      (acc: any, cur: any) => cur === 0 ? NaN : acc + cur))
    ) {
      return 0;
    }

    // one board for each possible winning run orientation
    let checkBoards = new Map();
    checkBoards.set("horiz", checkPrototype.map((row) => row.slice()));
    checkBoards.set("verti", checkPrototype.map((row) => row.slice()));
    checkBoards.set("ldiag", checkPrototype.map((row) => row.slice()));
    checkBoards.set("rdiag", checkPrototype.map((row) => row.slice()));

    // iterate over the board
    for (let row = 0; row < N_ROWS; row++) {
      for (let col = 0; col < N_COLS; col++) {
        let cell = state.board[row][col];
        for (let [key, val] of checkBoards) {

          // accumulator
          let acc;
          switch(key) {
            case "horiz": acc = val[row + 1][col]; // left
            break;
            case "verti": acc = val[row][col + 1]; // top
            break;
            case "ldiag": acc = val[row][col]; // top left
            break;
            case "rdiag": acc = val[row][col + 2]; // top right
            break;
          }

          val[row + 1][col + 1] = cell;
          if (cell < 0 && acc < 0 || cell > 0 && acc > 0) {
            val[row + 1][col + 1] += acc;
          }
          if (val[row + 1][col + 1] === 4) { return 1; }
          if (val[row + 1][col + 1] === -4) { return -1; }
        }
      }
    }
    return null;
  }
}
