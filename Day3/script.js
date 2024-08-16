const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');
const modeButtons = document.querySelectorAll('.mode-button');
const playerXWinsElement = document.getElementById('player-x-wins');
const playerOWinsElement = document.getElementById('player-o-wins');
const aiWinsElement = document.getElementById('ai-wins');

let board = Array(9).fill(null);
let isPlayerXTurn = true;
let gameMode = 'player'; // 'player' or 'ai'
let isGameOver = false;
let playerXWins = 0;
let playerOWins = 0;
let aiWins = 0;
//fd

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = index;
        cell.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (board[index] || isGameOver) return;

    board[index] = isPlayerXTurn ? 'X' : 'O';
    updateBoard();
    
    if (checkWinner()) {
        updateStatus(`${isPlayerXTurn ? 'Player X' : 'Player O'} Wins!`);
        updateStats();
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        updateStatus('Draw!');
        isGameOver = true;
    } else {
        isPlayerXTurn = !isPlayerXTurn;
        updateStatus(`${isPlayerXTurn ? 'Player X' : 'Player O'}'s Turn`);
        
        if (gameMode === 'ai' && !isPlayerXTurn) {
            aiMove();
        }
    }
}

function aiMove() {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = 'O';
    updateBoard();
    
    if (checkWinner()) {
        updateStatus('AI Wins!');
        aiWins++;
        updateStats();
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        updateStatus('Draw!');
        isGameOver = true;
    } else {
        isPlayerXTurn = true;
        updateStatus('Player X\'s Turn');
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateBoard() {
    board.forEach((value, index) => {
        boardElement.children[index].textContent = value;
        boardElement.children[index].classList.toggle('x', value === 'X');
        boardElement.children[index].classList.toggle('o', value === 'O');
    });
}

function updateStatus(message) {
    statusElement.textContent = message;
}

function updateStats() {
    playerXWinsElement.textContent = playerXWins;
    playerOWinsElement.textContent = playerOWins;
    aiWinsElement.textContent = aiWins;
}

function restartGame() {
    board.fill(null);
    isPlayerXTurn = true;
    isGameOver = false;
    updateBoard();
    updateStatus('Player X\'s Turn');
}

modeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        gameMode = e.target.id === 'player-vs-ai' ? 'ai' : 'player';
        restartGame();
    });
});

restartButton.addEventListener('click', restartGame);

// Initial Setup
createBoard();
updateStatus('Player X\'s Turn');