import readline from 'readline-sync';

class SecretKey {
    static generateKey() {
        const crypto = require('crypto');
        return crypto.createHash('sha3-256').update('mcmmiguel').digest('hex');
    }
}

class HMAC {
    static generateHMAC(key: string, move: any) { //TODO Modificar type del movimiento
        const crypto = require('crypto');
        return crypto.createHmac('sha3-256', key).update(move).digest('hex');
    }
}

class Errors {
    static invalidLength() {
        console.log('Please enter an odd move number greater or equal than 3');
    }
}

class Game {

}

class MenuGame {

    static showMenu(moveList: string[]) {
        if (moveList.length >= 3 && moveList.length % 2 === 1) {
            console.log("Available moves:");
            for (let i = 0; i < moveList.length; i++) {
                const move = moveList[i];
                console.log(`${i + 1} - ${move}`);
            }
            console.log('0 - exit');
            console.log('? - help');

            const move = readline.question("Enter your move: ");

            this.selectMove(move);

        } else {
            Errors.invalidLength();
        }
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
MenuGame.showMenu(moveList);



