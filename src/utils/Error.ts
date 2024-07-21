export default class Error {
    static invalidLength(): string {
        return 'Please enter an odd move number greater or equal to 3. Example: rock paper scissors';
    }

    static duplicatedMoves(): string {
        return 'The moves must not be repeated. Example: rock paper scissors';
    }

    static invalidSelection(): string {
        return 'Please, select a valid move.';
    }
}