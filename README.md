# Generalized Rock-Paper-Scissors Game

This project implements a generalized rock-paper-scissors game that supports an arbitrary odd number of moves, defined by the user through command line arguments.

## Requirements

- Node.js
- TypeScript

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using npm:

```
npm install
```

## Usage
To start the game, provide the moves as command line arguments. The moves must be an odd number of unique strings.

```
npm start -- rock paper scissors lizard Spock
```

## Examples of Execution
### With 3 moves:
```
npm start -- rock paper scissors
```

### With 5 moves:
```
npm start -- rock paper scissors lizard spock
```

### Menu Options
#### 1, 2, 3, ... : Select a move.
#### 0 : Exit the game.
#### ?: Show a help table with possible outcomes.

## Game Flow Example
```
> npm start -- rock paper scissors
HMAC: 9ED68097B2D5D9A968E85BD7094C75D00F96680DC43CDD6918168A8F50DE8507
Available moves:
1 - rock
2 - paper
3 - scissors
0 - exit
? - help
Enter your move: 2
Your move: paper
Computer move: rock
You win!
HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2
```

## Validation and HMAC Verification
You can use the online HMAC calculator provided when the game ends to verify that the computer's move has not been altered. Enter the key, and the computer will move to check that the HMAC matches the one shown at the start of the game.

## Error Handling
- If the number of moves is not odd or if there are duplicate moves, an error message is displayed and the program terminates.
- If an invalid menu option is selected, a message is shown prompting to select a valid option, and the menu is redisplayed without terminating the program.