import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../about-popover/about-popover';


const util = require('util')
import { Game_C4 as Game } from "./connect4";
import { MonteCarlo } from "./monte-carlo";



@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  items : any


  constructor(public popoverCtrl: PopoverController) {
    
      
      let game = new Game()
      let mcts = new MonteCarlo(game)
      
      let state = game.start()
      let winner = game.winner(state)
      
      // From initial state, play games until end
      
      while (winner === null) {
      
        console.log()
        console.log("player: " + (state.player === 1 ? 1 : 2))
        console.log(state.board.map((row : any) => row.map((cell : any) => cell === -1 ? 2 : cell)))
      
        mcts.runSearch(state, 1)
      
        let stats = mcts.getStats(state)
        console.log(util.inspect(stats, {showHidden: false, depth: null}))
      
        let play = mcts.bestPlay(state, "robust")
        console.log("chosen play: " + util.inspect(play, {showHidden: false, depth: null}))
      
        state = game.nextGameState(state, play)
        winner = game.winner(state)
      }
      
      console.log()
      console.log("winner: " + (winner === 1 ? 1 : 2))
      console.log(state.board.map((row : any) => row.map((cell : any) => cell === -1 ? 2 : cell)))




   }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
