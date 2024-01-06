function modifyBoardForGameLevel(board, difficulty) {
	const rowCols = new Set();
  
	for (let i = 0; i < difficulty; i++) {
	  let row = Math.floor(Math.random() * 9);
	  let col = Math.floor(Math.random() * 9);
  
	  // Check if the pair (row, col) is already in the set
	  while (rowCols.has(`${row}-${col}`)) {
		row = Math.floor(Math.random() * 9);
		col = Math.floor(Math.random() * 9);
	  }
  
	  // Add the pair (row, col) to the set
	  rowCols.add(`${row}-${col}`);
  
	  board[row][col] = 0;
	}
  
	return board;
  }
  
  export default modifyBoardForGameLevel;
  