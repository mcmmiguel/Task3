import SecretKey from './utils/SecretKey';
import HMAC from './utils/HMAC';
import Game from './Game/Game';
import GameMenu from './Game/GameMenu';
import colors from 'colors';

const moveList = process.argv.slice(2);
const formattedMoveList = GameMenu.validateMoves(moveList);

if (formattedMoveList) {
    const secretKey = SecretKey.generateKey();
    const game = new Game(formattedMoveList);
    const computerMove = game.generateComputerMove();
    const computerHmac = HMAC.generateHMAC(secretKey, computerMove);
    console.log(colors.yellow('HMAC: ' + computerHmac));

    GameMenu.showMenu();

    console.log(colors.yellow('HMAC Key: ' + secretKey));
    console.log(colors.underline('Check the computer move on:'), colors.blue('https://www.liavaag.org/English/SHA-Generator/HMAC/'), colors.italic('/ Use the movement number as input. Ex. 3'));
}