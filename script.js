'use strict'

const allFieldCells = document.querySelectorAll('.cell');
const turnOrder = document.querySelector('.game--status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

function gameLogic(event) {
	let infoActive = event.target.dataset.cellIndex;

	if (gameActive === false || gameState[infoActive] !== '') {
		return;
	}

	gameState[infoActive] = currentPlayer;
	allFieldCells[infoActive].textContent = currentPlayer;

	gameValidation();
}

function handlePlayerChange() {
	currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
	turnOrder.textContent = `It's ${currentPlayer}'s turn`;
}

function gameValidation() {
	const roundDraw = !gameState.includes('');

	for (let i = 0; i <= winningLines.length - 1; i++) {

		const winCondition = winningLines[i];
		const a = gameState[winCondition[0]];
		const b = gameState[winCondition[1]];
		const c = gameState[winCondition[2]];

		if (a === '' || b === '' || c === '') {
			continue;
		}

		if (a === b && b === c && c === a) {
			gameActive = false;
			turnOrder.textContent = `Player ${currentPlayer} has won!`;
			return;
		}
	}
	handlePlayerChange();
	if (gameActive === true && roundDraw) {
		turnOrder.textContent = 'Draw';
		gameActive = false;
		return;
	}
}

allFieldCells.forEach(cell =>
	cell.addEventListener('click', gameLogic));

document.querySelector('.game--restart').addEventListener('click', function () {
	for (let i = 0; i < allFieldCells.length; i++) {
		allFieldCells[i].textContent = '';
		gameState[i] = '';
	};

	currentPlayer = 'X';
	gameActive = true;
	turnOrder.textContent = `It's ${currentPlayer}'s turn`;
});