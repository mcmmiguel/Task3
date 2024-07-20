import Table from "cli-table";
import Game from "./Game";

export default class HelpTable {
    static showHelpTable() {
        const table = new Table({
            head: ['↓ PC / User →', ...Game.moveList],
        });

        const winningCombinationMatrix = Game.generateWinningCombinations();

        Game.moveList.forEach((move, index) => {
            const currentSimulation = winningCombinationMatrix[index];
            table.push([move, ...currentSimulation])
        })

        console.log(table.toString());
        process.exit();
    }
}