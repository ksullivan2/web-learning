//CONTROLLER
"use strict";

function Controller(){}	




Controller.prototype.updateModelSquare = function(pressedSquare, playerToken){
	//update model
	var row = pressedSquare.id[0];
	var col = pressedSquare.id[2];
	this.board.grid[row][col] = playerToken;
}

Controller.prototype.buttonClickHandler = function(event){
	//check whose turn it was
	if (this.board.xTurn){
		var playerToken = "X";	
	}
	else {
		var playerToken = "O";	
	}
	
	//update both model and view
	updateViewSquare(event.target, playerToken);
	this.updateModelSquare(event.target, playerToken);
	

	//check if the game has been won
	if (this.board.checkForWin()){
		this.disableAllSquares()
	}

	//minimax(this.board);
	//console.log(copyBoard(this.board));


	//swap whose turn it is
	this.board.xTurn = !this.board.xTurn;
}

Controller.prototype.newGameClickHandler = function(event){
	//update both model and controller
	this.resetView();
	this.board.resetBoardModel();

}

Controller.prototype.resetView = function(){
	//re-enable buttons and clear Xs and Os
	var squares = document.getElementsByClassName("square");
	//returns a node list, must be iterated through, can't use forEach =(

	for (var i = 0; i < squares.length; i++){
		squares[i].disabled = false;
		squares[i].firstChild.nodeValue = "";
	}
}

Controller.prototype.disableAllSquares = function(){
	//disable click input on unused squares, keeps Xs and Os
	var squares = document.getElementsByClassName("square");
	//returns a node list, must be iterated through, can't use forEach =(

	for (var i = 0; i < squares.length; i++){
		squares[i].disabled = true;
	}
}

