//MODEL
function BoardModel(){
	//set game properties
	this.xTurn = true;
	this.winner = "test";

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

BoardModel.prototype.resetBoardModel = function(){
	//clears board model, does not affect view
	this.grid.forEach(function(row){
		row.forEach(function(box){
		box = "_";
		})
	})
}


BoardModel.prototype.checkForWin = function(){
	return (this.checkRows() || this.checkCols() || this.checkDiagonals());
	
}

BoardModel.prototype.checkForDraw = function(){
	this.grid.forEach(function(row){
		row.forEach(function(square){
			if (square === "_"){
				return false;
			}
		})
	})
	return true;
}

BoardModel.prototype.checkRows = function(){
	this.grid.forEach(function(row){
		var testArray = [];
		row.forEach(function(square){
			testArray.push(square);
		})
		if (allInArrayEqual(testArray)){
			this.winner = testArray[0];
			return true;
		}
	})
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


