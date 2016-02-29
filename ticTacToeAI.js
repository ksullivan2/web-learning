

function minimax(board){
	//base case: check for win or draw
	if (board.checkForWin()){
		if (board.winner === "X") {
			return 10;
		}
		else{
			return -10;
		}
	}
	
	if (board.checkForDraw()){
		return 0;
	}
	
	//recursion starts here
	var possibleStates = [];

	//loop through board looking for empty squares
	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			if (board[row][col] === "_"){
				var tempBoard = copyBoard(board);
				possibleStates.push(tempBoard);

				if (tempBoard.xTurn){
					tempBoard[row][col] = "X";
				}
				else{
					tempBoard[row][col] = "O";
				}

				tempBoard.score = minimax(tempBoard);

			}
		}
	}

}

function copyBoard(sourceBoard){
	var newBoard = new Board();

	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			newBoard.grid[row][col] = sourceBoard.grid[row][col];
		}
	}

	newBoard.xTurn = sourceBoard.xTurn;

	return newBoard;
}