import SecretKey from './utils/SecretKey';
import HMAC from './utils/HMAC';
import Game from './Game/Game';
import GameMenu from './Game/GameMenu';

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

