// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    draw: 0
};

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.querySelector('#currentPlayer');
const currentPlayerContainer = document.querySelector('.current-player');
const restartBtn = document.querySelector('#restartBtn');
const resetBtn = document.querySelector('#resetBtn');
const modal = document.querySelector('#winnerModal');
const modalIcon = document.querySelector('#modalIcon');
const modalTitle = document.querySelector('#modalTitle');
const modalMessage = document.querySelector('#modalMessage');
const playAgainBtn = document.querySelector('#playAgainBtn');
const scoreXDisplay = document.querySelector('#scoreX');
const scoreODisplay = document.querySelector('#scoreO');
const scoreDrawDisplay = document.querySelector('#scoreDraw');

// Initialize game
function init() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartBtn.addEventListener('click', restartGame);
    resetBtn.addEventListener('click', resetScores);
    playAgainBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        restartGame();
    });
    
    updateCurrentPlayerDisplay();
    loadScores();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }
    
    updateCell(cell, index);
    checkWinner();
}

// Update cell
function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.classList.add('disabled');
}

// Check for winner
function checkWinner() {
    let roundWon = false;
    let winningCombination = null;
    
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        highlightWinningCells(winningCombination);
        gameActive = false;
        updateScore(currentPlayer);
        setTimeout(() => showModal(currentPlayer), 500);
        return;
    }
    
    // Check for draw
    if (!gameBoard.includes('')) {
        gameActive = false;
        updateScore('draw');
        setTimeout(() => showModal('draw'), 500);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

// Highlight winning cells
function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Update current player display
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer;
    
    if (currentPlayer === 'X') {
        currentPlayerContainer.classList.add('player-x-turn');
        currentPlayerContainer.classList.remove('player-o-turn');
    } else {
        currentPlayerContainer.classList.add('player-o-turn');
        currentPlayerContainer.classList.remove('player-x-turn');
    }
}

// Update score
function updateScore(winner) {
    if (winner === 'draw') {
        scores.draw++;
        scoreDrawDisplay.textContent = scores.draw;
    } else {
        scores[winner]++;
        if (winner === 'X') {
            scoreXDisplay.textContent = scores.X;
            animateScore(scoreXDisplay);
        } else {
            scoreODisplay.textContent = scores.O;
            animateScore(scoreODisplay);
        }
    }
    
    saveScores();
}

// Animate score
function animateScore(element) {
    element.style.transform = 'scale(1.3)';
    element.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Show modal
function showModal(winner) {
    if (winner === 'draw') {
        modalIcon.textContent = '🤝';
        modalTitle.textContent = "It's a Draw!";
        modalTitle.className = 'modal-title draw';
        modalMessage.textContent = "Great game! Want to try again?";
    } else {
        modalIcon.textContent = winner === 'X' ? '🎉' : '🎊';
        modalTitle.textContent = `Player ${winner} Wins!`;
        modalTitle.className = `modal-title winner-${winner.toLowerCase()}`;
        modalMessage.textContent = "Congratulations on your victory!";
    }
    
    modal.classList.add('show');
}

// Restart game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    updateCurrentPlayerDisplay();
}

// Reset scores
function resetScores() {
    if (confirm('Are you sure you want to reset all scores?')) {
        scores = {
            X: 0,
            O: 0,
            draw: 0
        };
        
        scoreXDisplay.textContent = '0';
        scoreODisplay.textContent = '0';
        scoreDrawDisplay.textContent = '0';
        
        saveScores();
        
        // Add animation
        [scoreXDisplay, scoreODisplay, scoreDrawDisplay].forEach(el => {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// Load scores from localStorage
function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    
    if (savedScores) {
        scores = JSON.parse(savedScores);
        scoreXDisplay.textContent = scores.X;
        scoreODisplay.textContent = scores.O;
        scoreDrawDisplay.textContent = scores.draw;
    }
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
    
    // Number keys 1-9 for cell selection
    if (e.key >= '1' && e.key <= '9' && gameActive) {
        const index = parseInt(e.key) - 1;
        if (gameBoard[index] === '') {
            updateCell(cells[index], index);
            checkWinner();
        }
    }
    
    // R for restart
    if (e.key.toLowerCase() === 'r') {
        restartGame();
    }
});

// Initialize the game
init();
