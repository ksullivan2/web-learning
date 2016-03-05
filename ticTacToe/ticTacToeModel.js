//MODEL
"use strict";

module.exports = BoardModel;

function BoardModel(){
	//hard-coding 3x3 for now, I know, I know...
	this.grid = [[],[],[]];
	this.players = [];
	this.xTurn = true;

	this.newGame()
}

BoardModel.prototype.newGame = function(){
	this.winner = null;
	//specifically NOT resetting xTurn so the losing player goes first next game.
	

	//create empty grid
	for (var row = 0; row < 3; row ++){
		for (var col = 0; col < 3; col ++){
			//add blank data to grid
			this.grid[row][col] = "_"
		}
	}
}

BoardModel.prototype.addPlayer = function(socket){
	if (this.players.length > 1){
		return false;
	}

	if (this.players.length === 0){
		var playerToken = "X";
	}
	else{ 
		var playerToken = "O";

	};
	

	this.players.push({socket, playerToken});
	return true;
}


BoardModel.prototype.findPlayerTokenBasedOnSocket = function(socket){
	//find the player's token based on the socket
	for (var i = 0; i < this.players.length; i++){
		if (this.players[i].socket === socket){
			return this.players[i].playerToken;
		}
	}
}

BoardModel.prototype.findPlayerSocketBasedOnToken = function(playerToken){
	//find the player's token based on the socket
	for (var i = 0; i < this.players.length; i++){
		if (this.players[i].playerToken === playerToken){
			return this.players[i].socket;
		}
	}
}

BoardModel.prototype.isItPlayersTurn = function(socket){
	var playerToken = this.findPlayerTokenBasedOnSocket(socket);

	//check if it's that player's turn, return boolean
	return (this.xTurn && playerToken == "X") || (!this.xTurn && playerToken == "O");
}


BoardModel.prototype.updateModelSquare = function(data, socket){
	var row = data.id[1];
	var col = data.id[2];

	var isItPlayersTurn = this.isItPlayersTurn(socket);
	var playerToken = this.findPlayerTokenBasedOnSocket(socket);

	//if the square was blank and it's their turn, make the move
	if (this.grid[row][col] == "_" && isItPlayersTurn){
		this.grid[row][col] = playerToken;
		return true;
	} 
	return false;
}

BoardModel.prototype.swapTurn = function(){
	this.xTurn = !this.xTurn;
}

BoardModel.prototype.checkForWin = function(){
	return (this.checkRows() || this.checkCols() || this.checkDiagonals());
}

BoardModel.prototype.checkForDraw = function(){
	var draw = true;
	
	this.grid.forEach(function(row){
		row.forEach(function(square){
			if (square === "_"){
				draw = false;
			}
		})
	})
	return draw;
}

BoardModel.prototype.checkRows = function(){

	for (var row = 0; row < 3; row ++){
		var testArray = [];
		for (var col = 0; col < 3; col ++){
			testArray.push(this.grid[row][col]);
			}
		if (this.allInArrayEqual(testArray)){
			this.winner = testArray[0];
			return true;
		}
	}
	return false;
}		


BoardModel.prototype.checkCols = function(){
	//looping through columns, against the grain of data structure, so easier to do for loop

	for (var col = 0; col < 3; col ++){
		var testArray = [];
		for (var row = 0; row < 3; row ++){
			testArray.push(this.grid[row][col]);
			}
		if (this.allInArrayEqual(testArray)){
			this.winner = testArray[0];
			return true;
		}
	}
	return false;
}

BoardModel.prototype.checkDiagonals = function(){
	var leftDiagonal = [this.grid[0][0],this.grid[1][1],this.grid[2][2]];
	var rightDiagonal = [this.grid[0][2],this.grid[1][1],this.grid[2][0]];
	
	if (this.allInArrayEqual(leftDiagonal)){
		this.winner = leftDiagonal[0];
		return true;
	}
	else if (this.allInArrayEqual(rightDiagonal)){
		this.winner = rightDiagonal[0];
		return true;
	};
	return false;
}


//helper functions for model

BoardModel.prototype.allInArrayEqual = function(array){
	for (var i = 0; i < array.length; i ++){
		if (array[i] === "_" || array[i] !== array[0]){
			return false;
		}
	}
	return true;
}

