// sudokuGenerator.js
function shuffle(array) {
	// Function to shuffle an array using Fisher-Yates algorithm
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
  }
  
  function isValid(board, row, col, num) {
	// Check if 'num' is not present in the current row, column, and the 3x3 subgrid
	for (let i = 0; i < 9; i++) {
	  if (
		board[row][i] === num ||
		board[i][col] === num ||
		board[row - (row % 3) + Math.floor(i / 3)][col - (col % 3) + (i % 3)] === num
	  ) {
		return false;
	  }
	}
	return true;
  }
  
  function solveSudoku(board) {
	for (let row = 0; row < 9; row++) {
	  for (let col = 0; col < 9; col++) {
		if (board[row][col] === 0) {
		  for (let num = 1; num <= 9; num++) {
			if (isValid(board, row, col, num)) {
			  board[row][col] = num;
  
			  if (solveSudoku(board)) {
				return true;
			  }
  
			  board[row][col] = 0;
			}
		  }
		  return false;
		}
	  }
	}
	return true;
  }
  
  function generateSudokuBoard() {
	const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
	// Shuffle the numbers 1 to 9 for the first row
	const firstRowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	shuffle(firstRowNumbers);
  
	// Assign the shuffled numbers to the first row
	for (let i = 0; i < 9; i++) {
	  board[0][i] = firstRowNumbers[i];
	}
  
	// Fill the board with a solved Sudoku puzzle
	solveSudoku(board);
  
  
	return board;
  }
  
  export default generateSudokuBoard;
  