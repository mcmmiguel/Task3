import readline from 'readline-sync';
import Error from '../utils/Error';
import Game from './Game';
import HelpTable from './HelpTable';

export default class GameMenu {
    static moveList: string[] = [];

    static validateMoves(moveList: string[]) {
        const formattedMoves = moveList.map(move => move.trim().toLowerCase());
        const duplicates = formattedMoves.filter((value, index, self) => self.indexOf(value) !== index);

        if (duplicates.length) {
            return console.log(Error.duplicatedMoves());;
        }

        if (formattedMoves.length < 3 || formattedMoves.length % 2 === 0) {
            return console.log(Error.invalidLength());
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
        if (move === '?') return HelpTable.showHelpTable();

        if (availableMoves.includes(move)) {
            Game.userMove = move;
            const winner = Game.getGameWinner(move);
            Game.showWinner(winner);
        } else {
            console.log(Error.invalidSelection());
            this.showMenu();
        }

    }
}