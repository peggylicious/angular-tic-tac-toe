import { Component, OnInit } from '@angular/core';
import { Players } from '../models/players';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  isNext: boolean = false;
  winner: string = '';
  player = '';
  obj: Players = {
    X: [],
    O: [],
  };
  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    this.squares = Array(9).fill(null);
    this.isNext = false;
    this.winner = '';
    this.obj = {
      X: [],
      O: [],
    };
  }

  get Player() {
    return this.isNext ? 'O' : 'X';
  }
  nextPlayer() {
    return (this.isNext = !this.isNext);
  }
  playComputer() {
    let number_of_squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let chosenSquares = this.obj['X'].concat(this.obj['O']);
    let computerValue = 'O';
    let notSelected = number_of_squares.filter(
      (el) => !chosenSquares.includes(el)
    );
    var item: number =
      notSelected[Math.floor(Math.random() * notSelected.length)];
    setTimeout((x: number) => {
      this.myPlayer(item, computerValue);
      return (x = 0);
    }, 4000);
  }
  myPlayer(index: number, value: string, evt?: Event) {
    // Check if game has a winner
    if (this.winner === 'X' || this.winner == 'O') {
      return;
    }
    // Check if square has already been selected
    if (this.squares[index] == 'X' || this.squares[index] == 'O') {
      return;
    } else {
      this.squares.splice(index, 1, this.Player);
      this.obj[this.Player].push(index);
      if (this.obj[this.Player].length >= 3) {
        this.checkWinner(this.Player, this.obj[this.Player]);
      } //else {
      // this.isNext = !this.isNext;
      //}

      this.isNext = !this.isNext;
      if (this.isNext === true) {
        // Computers turn
        // Check which squares player X and you have not picked and pick from available ones
        this.playComputer();
      }
    }
  }
  checkWinner(x: string, playerEntry: number[]) {
    // If value occurs 3 or more times
    // Move indexto new array
    let newArray: number[] = [];
    let winnings: Array<number[]> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // Compare Loop through wining arrays
    winnings.forEach((el1, index1, array1) => {
      if (
        playerEntry.includes(el1[0]) &&
        playerEntry.includes(el1[1]) &&
        playerEntry.includes(el1[2])
      ) {
        this.winner = x;
        return;
      } else {
        this.isNext = !this.isNext;
      }
    });
  }
}
