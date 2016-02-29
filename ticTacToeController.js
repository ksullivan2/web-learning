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


	//swap whose turn it is
	this.board.xTurn = !this.board.xTurn;
}

Controller.prototype.newGameClickHandler = function(event){
	//update both model and controller
	resetView();
	this.board = new BoardModel()

}

Controller.prototype.winGame = function(){
	disableAllSquares()
}





