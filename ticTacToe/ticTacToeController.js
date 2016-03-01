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
	if (this.board.checkForWin() || this.board.checkForDraw()){
		this.winGame();	
	}

	else{
		//swap whose turn it is
		this.board.xTurn = !this.board.xTurn;
		this.computerMove();
	}
	
}

Controller.prototype.newGameClickHandler = function(event){
	//update both model and view
	resetView();
	this.board = new BoardModel()

	//reset view
	document.getElementById("drawText").style.display = "none";
	document.getElementById("loseText").style.display = "none";


}

Controller.prototype.winGame = function(){
	disableAllSquares()
	if (this.board.winner){
		document.getElementById("loseText").style.display = "block";
	}
	else{
		document.getElementById("drawText").style.display = "block";
	}
	
}


Controller.prototype.computerMove = function(){
	//updates the model to the computer's next best possible move
	this.board = minimax(this.board, -1);
	this.updateViewFromModel();

	//check if the game has been won
	if (this.board.checkForWin()){
		console.log("computer check for win")
		this.winGame();	
	}
}


Controller.prototype.updateViewFromModel = function(){
	for (var row = 0; row < 3; row++){
		for(var col = 0; col < 3; col++){
			if (this.board.grid[row][col] != "_"){
				var square = document.getElementById("s"+row+col);
				square.firstChild.nodeValue = this.board.grid[row][col];
				square.disabled = true;

			}
		}
	}
}


