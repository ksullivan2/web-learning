"use strict";


function minimax(board, count){
	//count will keep track of how many levels deep we are in the recursion
	//always initialize count with -1

	//base case: check for win or draw
	if (board.checkForWin()){
		if (board.winner === "X") {
			return 10 - count;
		}
		else{
			return count - 10;
		}
	}
	
	if (board.checkForDraw()){
		return 0;
	
	}

	//create an array of possible next moves
	var possibleStates = createPossibleStates(board);

	//we'll store max and mins here. initialize with the lowest possible scores
	var max = -10;
	var min = 10;

	var maxBoard = null;
	var minBoard = null;
	
	//for each possible move, figure out the min/max possible score
	//could store indexes instead, probably better than storing board objects
	possibleStates.forEach(function(possibleMove){
		possibleMove.xTurn = !possibleMove.xTurn;
		possibleMove.score = minimax(possibleMove, count+1);

		//save the score for each
		if (possibleMove.score >= max){
			max = possibleMove.score;
			maxBoard = possibleMove;
		}
		if (possibleMove.score <= min){
			min = possibleMove.score;
			minBoard = possibleMove;
		}	
	})

	//if it's the top level of this loop, return optimal move. else, return the score.
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
					//console.log("X @ ",row,",",col);
				}
				else{
					tempBoard.grid[row][col] = "O";
					//console.log("O @ ",row,",",col);
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