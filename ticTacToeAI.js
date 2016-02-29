

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

	//loop through possible moves and return the max/min move
	var max = 0;
	var min = 0;;

	var maxBoard = null;
	var minBoard = null;

	possibleStates.forEach(function(possibleMove){
		if (possibleMove.score >= max){
			max = possibleMove.score;
			maxBoard = possibleMove;
		}
		if (possibleMove.score <= min){
			min = possibleMove.score;
			minBoard = possibleMove;
		}	
	})

	if (xTurn){
		board = maxBoard;
	}
	else{
		board = minBoard;
	}

	return board;

}

function copyBoard(sourceBoard){
	var newBoard = new BoardModel();

	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			newBoard.grid[row][col] = sourceBoard.grid[row][col];
		}
	}

	newBoard.xTurn = sourceBoard.xTurn;

	return newBoard;
}