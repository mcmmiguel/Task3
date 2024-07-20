import colors from 'colors';
export default class Game {

    static moveList: string[]
    static computerMove: string = '';
    static userMove: string = '';

    constructor(moves: string[]) {
        Game.moveList = moves;
    }

    generateComputerMove() {
        Game.computerMove = (Math.floor(Math.random() * ((Game.moveList.length - 1) + 1)) + 1).toString();
        return Game.computerMove;
    }

    static getGameWinner(userMove: string, providedMachineMove?: string) {
        const machineMove = providedMachineMove || this.computerMove;
        const halfTotalMoves = (Game.moveList.length - 1) / 2;
        const winner = Math.sign((Number(machineMove) - Number(userMove) + halfTotalMoves + Game.moveList.length) % Game.moveList.length - halfTotalMoves);
        return winner;
    }

    static showWinner(winner: number) {
        console.log(colors.blue(`Your move:`), colors.yellow(`${Game.moveList[+Game.userMove - 1]}`));
        console.log(colors.red(`Computer's move:`), colors.yellow(`${Game.moveList[+Game.computerMove - 1]}`));

        if (winner === 1) {
            console.log(colors.bgRed('You lose :('));
        } else if (winner === -1) {
            console.log(colors.bgGreen('You win! :D'));
        } else {
            console.log(colors.bgMagenta("It's a draw"));
        }
    }

    static exitGame() {
        process.exit();
    }

    static generateWinningCombinations() {

        const resultStatus: { [key: string]: string } = {
            '1': 'Win',
            '-1': 'Lose',
            '0': 'Draw'
        }

        const winningCombinationsMatrix = this.moveList.map((columnMove, columnIndex) => {
            const currentColumnMove = (columnIndex + 1).toString();
            const currentColumn: string[] = [];

            for (let rowIndex = 0; rowIndex < this.moveList.length; rowIndex++) {
                const currentRowMove = (rowIndex + 1).toString();

                const currentWinningCombination = this.getGameWinner(currentColumnMove, currentRowMove);

                let resultMessage = resultStatus[currentWinningCombination];
                currentColumn.push(resultMessage);
            }

            return currentColumn;
        });

        return winningCombinationsMatrix;
    }
}