//MODEL
"use strict";


function BoardModel(){
	//set game properties
	this.xTurn = true;
	this.winner = null;

	//create grid
	this.grid = [];
	for (var row = 0; row < 3; row ++){
		this.grid[row] = [];
		for (var col = 0; col < 3; col ++){
			
			//add blank data to grid
			this.grid[row][col] = "_"
		}
	}
}

BoardModel.prototype.updateModelSquare = function(pressedSquare, playerToken){
	//update model
	var row = pressedSquare.id[1];
	var col = pressedSquare.id[2];
	this.grid[row][col] = playerToken;
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
	var self = this;

	for (var row = 0; row < 3; row ++){
		var testArray = [];
		for (var col = 0; col < 3; col ++){
			testArray.push(this.grid[row][col]);
			}
		if (allInArrayEqual(testArray)){
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
		if (allInArrayEqual(testArray)){
			this.winner = testArray[0];
			return true;
		}
	}
	return false;
}

BoardModel.prototype.checkDiagonals = function(){
	var leftDiagonal = [this.grid[0][0],this.grid[1][1],this.grid[2][2]];
	var rightDiagonal = [this.grid[0][2],this.grid[1][1],this.grid[2][0]];
	
	if (allInArrayEqual(leftDiagonal)){
		this.winner = leftDiagonal[0];
		return true;
	}
	else if (allInArrayEqual(rightDiagonal)){
		this.winner = rightDiagonal[0];
		return true;
	};
	return false;
}


//helper functions for model

function allInArrayEqual(array){
	for (var i = 0; i < array.length; i ++){
		if (array[i] === "_" || array[i] !== array[0]){
			return false;
		}
	}
	return true;
}

