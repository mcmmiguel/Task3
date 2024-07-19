import readline from 'readline-sync';

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
}


class Game {

    private moveList: string[]

    constructor(moves: string[]) {
        this.moveList = moves;
    }

    generateComputerMove() {
        const computerMove = Math.floor(Math.random() * ((this.moveList.length - 1) + 1)) + 1;
        console.log(computerMove);
        return computerMove.toString();
    }

    getGameWinner(computerMove: string, userMove: string) {
        const aditionalMovement = 1;
        const winner = Math.sign((+computerMove - +userMove + aditionalMovement + moveList.length) % moveList.length - aditionalMovement);

        if (winner === 1) {
            console.log('You lose!');
        } else if (winner === -1) {
            console.log('You win!!');
        } else {
            console.log("It's a draw");
        }
    }

}

class MenuGame {
    static validateMoves(moveList: string[]) {
        const formattedMoves = moveList.map(move => move.trim().toLocaleLowerCase());
        const duplicates = formattedMoves.filter((value, index, self) => self.indexOf(value) !== index);

        if (duplicates.length) {
            return Error.duplicatedMoves();
        }

        if (formattedMoves.length >= 3 && formattedMoves.length % 2 === 1) {
            this.showMenu(formattedMoves);
        } else {
            Error.invalidLength();
        }

    }

    static showMenu(moves: string[]) {
        const secretKey = SecretKey.generateKey();
        const game = new Game(moveList);
        const computerMove = game.generateComputerMove();

        const computerHmac = HMAC.generateHMAC(secretKey, computerMove);
        console.log('HMAC: ' + computerHmac);
        console.log(moves[+computerMove - 1]); //Mostrar el movimiento de la computadora
        // console.log('Secret Key: ' + secretKey);
        // console.log(game.getGameWinner(computerMove, '1'));
        console.log("Available moves:");

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            console.log(`${i + 1} - ${move}`);
        }
        console.log('0 - exit');
        console.log('? - help');

        const userMove = readline.question("Enter your move: ");
        game.getGameWinner(computerMove, userMove);

        this.selectMove(userMove);
    }

    static selectMove(move: string) {

        if (move == '0') this.exitGame();
        if (move === '?') return this.showHelp();

        console.log('Your move is ' + move);
        console.log("Finish");
    }

    static exitGame() {
        process.exit();
    }

    static showHelp() {
        console.log('Not implemented method');
    }

}

const moveList = process.argv.slice(2);
MenuGame.validateMoves(moveList);



