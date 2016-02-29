function computerMove(board){
	//create an array of possible next moves;
	var possibleStates = createPossibleStates(board);

	possibleStates.forEach(function(possibleMove){
		possibleMove.xTurn = !possibleMove.xTurn;
		possibleMove.score = minimax(possibleMove);
	})


}




function minimax(board, count){
	
	//base case: check for win or draw
	if (board.checkForWin()){
		if (board.winner === "X") {
			console.log("base case: 10")
			return 10 - count;
		}
		else{
			console.log("base case: -10")
			return - 10 + count;
		}
	}
	
	if (board.checkForDraw()){
		console.log("base case: 0")
		return 0;
	
	}

	var possibleStates = createPossibleStates(board);
	
	possibleStates.forEach(function(possibleMove){
		possibleMove.xTurn = !possibleMove.xTurn;
		possibleMove.score = minimax(possibleMove, count+1);
	})
			
	console.log("possible states are: ",possibleStates);

	//loop through possible moves and return the max/min move
	var max = 0;
	var min = 0;

	var maxBoard = null;
	var minBoard = null;

	possibleStates.forEach(function(possibleMove){
		if (possibleMove.score >= max){
			//console.log(possibleMove);
			max = possibleMove.score;
			maxBoard = possibleMove;
		}
		if (possibleMove.score <= min){
			//console.log(possibleMove);
			min = possibleMove.score;
			minBoard = possibleMove;
		}	
	})

	if (board.xTurn){
		if (count >=0 ){
			return max;
		}
		else{
			return maxBoard;
		}
	}

	else {
		if (count >=0 ){
			return min;
		}
		else{
			return minBoard;
		}
	}
		
		
}



function createPossibleStates(board){
	var possibleStates = []

	//loop through board looking for empty squares
	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			if (board.grid[row][col] === "_"){

				var tempBoard = copyBoard(board);
				possibleStates.push(tempBoard);
				
				if (tempBoard.xTurn){
					tempBoard.grid[row][col] = "X";
					console.log("X @ ",row,",",col);
				}
				else{
					tempBoard.grid[row][col] = "O";
					console.log("O @ ",row,",",col);
				}
			}
		}
	}
	return possibleStates;
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