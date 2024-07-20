import readline from 'readline-sync';
import Table from 'cli-table';
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

    static moveList: string[]
    static computerMove: string = '';
    static userMove: string = '';

    constructor(moves: string[]) {
        Game.moveList = moves;
    }

    generateComputerMove() {
        Game.computerMove = (Math.floor(Math.random() * ((Game.moveList.length - 1) + 1)) + 1).toString();
        console.log(Game.computerMove);
        return Game.computerMove;
    }

    static getGameWinner(userMove: string, providedMachineMove?: string) {
        const machineMove = providedMachineMove || this.computerMove;
        const halfTotalMoves = (Game.moveList.length - 1) / 2;
        const winner = Math.sign((Number(machineMove) - Number(userMove) + halfTotalMoves + Game.moveList.length) % moveList.length - halfTotalMoves);
        return winner;
    }

    static showWinner(winner: number) {
        console.log(`Your move: ${moveList[+this.userMove - 1]}`);
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

        const winnersSimulationList = moveList.map((columnMove) => {

            const currentColumnMove = (moveList.indexOf(columnMove) + 1).toString();

            const currentColumn: string[] = [];

            for (let i = 0; i < moveList.length; i++) {
                const rowMove = (moveList.indexOf(moveList[i]) + 1).toString();
                const currentWinner = this.getGameWinner(currentColumnMove, rowMove);

                let resultMessage = '';

                if (currentWinner === 1) {
                    resultMessage = 'Win';
                } else if (currentWinner === -1) {
                    resultMessage = 'Lose';
                } else {
                    resultMessage = 'Draw';
                }
                currentColumn.push(resultMessage);
            }

            return currentColumn;

        })

        const table = new Table({
            head: ['↓ PC / User →', ...moveList],
        });

        moveList.forEach((move, index) => {
            const currentSimulation = winnersSimulationList[index];
            table.push([move, ...currentSimulation])
        })

        console.log(table.toString());
    }
}
class GameMenu {

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
        GameMenu.selectMove(userMove);
    }

    static selectMove(move: string) {
        const availableMoves = this.moveList.map((move, index) => (index + 1).toString());
        if (move == '0') Game.exitGame();
        if (move === '?') return Game.showHelp();

        if (availableMoves.includes(move)) {
            Game.userMove = move;
            const winner = Game.getGameWinner(move);
            Game.showWinner(winner);
        } else {
            Error.invalidSelection();
            this.showMenu();
        }

    }
}

const moveList = process.argv.slice(2);
const formattedMoveList = GameMenu.validateMoves(moveList);

if (formattedMoveList) {
    const secretKey = SecretKey.generateKey();
    const game = new Game(formattedMoveList);
    const computerMove = game.generateComputerMove();
    const computerHmac = HMAC.generateHMAC(secretKey, computerMove);
    console.log('HMAC: ' + computerHmac);

    GameMenu.showMenu();

    console.log('HMAC Key: ' + secretKey);
    console.log('Check the computer move on: https://www.liavaag.org/English/SHA-Generator/HMAC/');
}

