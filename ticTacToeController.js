//CONTROLLER
"use strict";

function Controller(){}	


Controller.prototype.buttonClickHandler = function(event){
	var pressedSquare = event.target

	//check whose turn it was
	if (this.board.xTurn){
		var playerToken = "X";	
	}
	else {
		var playerToken = "O";	
	}
	
	//update both model and view
	updateViewSquare(pressedSquare, playerToken);
	this.board.updateModelSquare(pressedSquare, playerToken);
	

	//check if the game has been won
	if (this.board.checkForWin()){
		this.winGame();	
	}

	else{
		//swap whose turn it is
		this.board.xTurn = !this.board.xTurn;
		this.computerMove();
	}
	
}

Controller.prototype.newGameClickHandler = function(event){
	//update both model and controller
	resetView();
	this.board = new BoardModel()

}

Controller.prototype.winGame = function(){
	disableAllSquares()
}


Controller.prototype.computerMove = function(){
	//updates the model to the computer's next best possible move
	this.board = minimax(this.board, -1);
	this.updateViewFromModel();

	//also changes turn? need to check
}


Controller.prototype.updateViewFromModel = function(){
	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			document.getElementById(row+","+col).firstChild = this.board.grid[row][col];
		}
	}
}


