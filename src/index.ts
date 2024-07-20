import readline from 'readline-sync';
const asciiTable = require('ascii-table');
class SecretKey {
    static generateKey() {
        const crypto = require('crypto');
        return crypto.createHash('sha3-256').update('mcmmiguel').digest('hex');
    }
}

class HMAC {
    static generateHMAC(key: string, move: string) {
        const crypto = require('crypto');
        return crypto.createHmac('sha3-256', key).update(move).digest('hex');
    }
}

class Error {
    static invalidLength() {
        console.log('Please enter an odd move number greater or equal than 3');
        console.log('Example: rock paper scissors');
    }

    static duplicatedMoves() {
        console.log('The moves must be unique.');
        console.log('Example: rock paper scissors');
    }

    static invalidSelection() {
        console.log('Please select a valid move');
    }
}

class Game {

    private moveList: string[]
    static computerMove: string = '';

    constructor(moves: string[]) {
        this.moveList = moves;
    }

    generateComputerMove() {
        Game.computerMove = (Math.floor(Math.random() * ((this.moveList.length - 1) + 1)) + 1).toString();
        return Game.computerMove;
    }

    static getGameWinner(userMove: string) {
        const aditionalMovement = 1;
        const winner = Math.sign((+this.computerMove - +userMove + aditionalMovement + moveList.length) % moveList.length - aditionalMovement);

        console.log(`Your move: ${moveList[+userMove - 1]}`);
        console.log(`Computer move: ${moveList[+Game.computerMove - 1]}`);

        if (winner === 1) {
            console.log('You lose :(');
        } else if (winner === -1) {
            console.log('You win! :D');
        } else {
            console.log("It's a draw");
        }
    }

    static exitGame() {
        process.exit();
    }

    static showHelp() {
        return console.log('Not implemented method');
    }
}
class MenuGame {

    static moveList: string[] = [];

    static validateMoves(moveList: string[]) {
        const formattedMoves = moveList.map(move => move.trim().toLowerCase());
        const duplicates = formattedMoves.filter((value, index, self) => self.indexOf(value) !== index);

        if (duplicates.length) {
            return Error.duplicatedMoves();
        }

        if (formattedMoves.length < 3 || formattedMoves.length % 2 === 0) {
            return Error.invalidLength();
        }

        this.moveList = formattedMoves;
        return formattedMoves;
    }

    static showMenu() {
        for (let i = 0; i < this.moveList.length; i++) {
            const move = this.moveList[i];
            console.log(`${i + 1} - ${move}`);
        }
        console.log('0 - exit');
        console.log('? - help');

        const userMove = readline.question("Enter your move: ");
        MenuGame.selectMove(userMove);
        return userMove;
    }


    static selectMove(move: string) {
        const availableMoves = this.moveList.map((move, index) => (index + 1).toString());
        if (move == '0') Game.exitGame();
        if (move === '?') return Game.showHelp();

        if (availableMoves.includes(move)) {
            Game.getGameWinner(move);
        } else {
            Error.invalidSelection();
            this.showMenu();
        }

    }
}

const moveList = process.argv.slice(2);
const formattedMoveList = MenuGame.validateMoves(moveList);

if (formattedMoveList) {
    const secretKey = SecretKey.generateKey();
    const game = new Game(formattedMoveList);
    const computerMove = game.generateComputerMove();
    const computerHmac = HMAC.generateHMAC(secretKey, computerMove);
    console.log('HMAC: ' + computerHmac);

    MenuGame.showMenu();


    console.log('HMAC Key: ' + secretKey);
    console.log('Check the computer move on: https://www.liavaag.org/English/SHA-Generator/HMAC/');
}

