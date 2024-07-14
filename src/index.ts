/**
 * Represents a cell in the TicTacToe board which can be "x", "o", or null.
 */
export type Cell = "x" | "o" | null

/**
 * Represents a TicTacToe board.
 */
export type TicTacToeBoard = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]

/**
 * Enum for game status.
 */
export const enum Status {
    Continue,
    Draw,
    X,
    O
}

/**
 * Represents the result of a move.
 */
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

/**
 * A placeholder for an empty TicTacToe board.
 * @type {TicTacToeBoard}
 */
export const Placeholder: TicTacToeBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

/**
 * Finds the next move for the bot on the given TicTacToe board.
 * @param {TicTacToeBoard} board - The current state of the TicTacToe board.
 * @param {"x" | "o"} bot - The bot's marker ("x" or "o").
 * @param {boolean} [strict=true] - If true, makes a random move; otherwise, uses minimax to find the best move.
 * @returns {FindMove} - The result of the move.
 */
export function TicTacToe(board: TicTacToeBoard, bot: "x" | "o", strict: boolean = true): FindMove {
    const winner = checkWinner(board)
    if (winner) return { status: winner === "x" ? Status.X : Status.O, board }

    if (!isMovesLeft(board)) return { status: Status.Draw, board }

    const move = strict ? findRandomMove(board) : findBestMove(board, bot, bot === "x" ? "o" : "x")
    board[move.row][move.col] = bot

    const updatedWinner = checkWinner(board)
    if (updatedWinner) return { status: updatedWinner === "x" ? Status.X : Status.O, board }

    if (!isMovesLeft(board)) return { status: Status.Draw, board, placement: { ...move } }
    return { status: Status.Continue, board, placement: { ...move } }
}

/**
 * Checks if there are any moves left on the board.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @returns {boolean} - True if there are moves left, false otherwise.
 */
function isMovesLeft(board: TicTacToeBoard): boolean {
    for (let row of board) {
        if (row.includes(null)) {
            return true
        }
    }
    return false
}

/**
 * Evaluates the board and returns a score based on the bot's perspective.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @param {"x" | "o"} bot - The bot's marker ("x" or "o").
 * @returns {number} - The score of the board.
 */
function evaluate(board: TicTacToeBoard, bot: "x" | "o"): number {
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0] === bot ? +10 : -10
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col] === bot ? +10 : -10
        }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0] === bot ? +10 : -10
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2] === bot ? +10 : -10
    }

    return 0
}

/**
 * Minimax algorithm to find the best move.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @param {number} depth - The current depth of recursion.
 * @param {boolean} isMax - True if the current move is for maximizer (bot), false otherwise.
 * @param {"x" | "o"} bot - The bot's marker ("x" or "o").
 * @param {"x" | "o"} user - The user's marker ("x" or "o").
 * @returns {number} - The best value for the move.
 */
function minimax(board: TicTacToeBoard, depth: number, isMax: boolean, bot: "x" | "o", user: "x" | "o"): number {
    const score = evaluate(board, bot)

    if (score === 10) return score - depth
    if (score === -10) return score + depth
    if (!isMovesLeft(board)) return 0

    if (isMax) {
        let best = -Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    board[i][j] = bot
                    best = Math.max(best, minimax(board, depth + 1, false, bot, user))
                    board[i][j] = null
                }
            }
        }
        return best
    } else {
        let best = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    board[i][j] = user
                    best = Math.min(best, minimax(board, depth + 1, true, bot, user))
                    board[i][j] = null
                }
            }
        }
        return best
    }
}

/**
 * Finds the best move for the bot using the minimax algorithm.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @param {"x" | "o"} bot - The bot's marker ("x" or "o").
 * @param {"x" | "o"} user - The user's marker ("x" or "o").
 * @returns {{row: number, col: number}} - The best move for the bot.
 */
function findBestMove(board: TicTacToeBoard, bot: "x" | "o", user: "x" | "o"): { row: number; col: number } {
    let bestVal = -Infinity
    let bestMove = { row: -1, col: -1 }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                board[i][j] = bot
                const moveVal = minimax(board, 0, false, bot, user)
                board[i][j] = null
                if (moveVal > bestVal) {
                    bestMove = { row: i, col: j }
                    bestVal = moveVal
                }
            }
        }
    }

    return bestMove
}

/**
 * Checks for a winner on the board.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @returns {"x" | "o" | null} - The winner ("x" or "o") or null if there is no winner yet.
 */
function checkWinner(board: TicTacToeBoard): "x" | "o" | null {
    for (let row of board) {
        if (row[0] !== null && row[0] === row[1] && row[1] === row[2]) {
            return row[0]
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== null && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col]
        }
    }

    if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0]
    }

    if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2]
    }

    return null
}

/**
 * Finds a random move on the board.
 * @param {TicTacToeBoard} board - The TicTacToe board.
 * @returns {{row: number, col: number}} - A random move for the bot.
 */
function findRandomMove(board: TicTacToeBoard): { row: number; col: number } {
    const emptyCells: { row: number; col: number }[] = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                emptyCells.push({ row: i, col: j })
            }
        }
    }

    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
}
