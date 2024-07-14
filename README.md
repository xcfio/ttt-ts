# ttt-ts

`ttt-ts` is a TypeScript library for creating and managing a Tic-Tac-Toe game. It provides functions to determine the best move using the minimax algorithm, check the game status, and manage the game board.

## Installation

You can install the `ttt-ts` package using npm, yarn, or pnpm.

### npm

```bash
npm install ttt-ts
```

### yarn

```bash
yarn add ttt-ts
```

### pnpm

```bash
pnpm add ttt-ts
```

## Usage

### JavaScript

```javascript
const { TicTacToe, Status } = require("ttt-ts")

const board = [
    [null, "x", "o"],
    ["x", "o", "x"],
    ["x", null, null]
]

const bot = "o"

const result = TicTacToe(board, bot)

console.log(result)
// {
//     status: Status.Continue,
//     board: [
//         [null, "x", "o"],
//         ["x", "o", "x"],
//         ["x", "o", null]
//     ],
//     placement: { row: 2, col: 1 }
// }
```

### TypeScript

```typescript
import { TicTacToe, TicTacToeBoard, Status } from "ttt-ts"

const board: TicTacToeBoard = [
    [null, "x", "o"],
    ["x", "o", "x"],
    ["x", null, null]
]

const bot = "o"

const result = TicTacToe(board, bot)

console.log(result)
// {
//     status: Status.Continue,
//     board: [
//         [null, "x", "o"],
//         ["x", "o", "x"],
//         ["x", "o", null]
//     ],
//     placement: { row: 2, col: 1 }
// }
```

## API Reference

### Types

#### `Cell`

Represents a cell in the TicTacToe board which can be "x", "o", or null.

```typescript
export type Cell = "x" | "o" | null
```

#### `TicTacToeBoard`

Represents a TicTacToe board.

```typescript
export type TicTacToeBoard = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]
```

#### `Status`

Enum for game status.

```typescript
export const enum Status {
    Continue,
    Draw,
    X,
    O
}
```

#### `FindMove`

Represents the result of a move.

```typescript
export type FindMove = { board: TicTacToeBoard } & (
    | {
          status: Status.Continue
          placement: { row: number; col: number }
      }
    | {
          status: Status.Draw | Status.X | Status.O
          placement?: { row: number; col: number }
      }
)
```

### Constants

#### `Placeholder`

A placeholder for an empty TicTacToe board.

```typescript
export const Placeholder: TicTacToeBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
```

### Functions

#### `TicTacToe`

Finds the next move for the bot on the given TicTacToe board.

```typescript
function TicTacToe(board: TicTacToeBoard, bot: "x" | "o", strict: boolean = false): FindMove
```

**Parameters:**

-   `board: TicTacToeBoard` - The current state of the TicTacToe board.
-   `bot: "x" | "o"` - The bot's marker ("x" or "o").
-   `strict: boolean` - If true, makes a random move; otherwise, uses minimax to find the best move.

**Returns:**

-   `FindMove` - The result of the move.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.
