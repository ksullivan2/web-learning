//VIEW
"use strict";


var socket = io.connect();

socket.on('update view', function(data){
	updateViewFromModel(data);
})
socket.on('reset view', function(){
	resetView();
})
socket.on('room full', function(){
	alert("ROOM IS FULL.");
})
socket.on('game over',function(data){
	disableAllSquares()
	document.getElementById("gameOverText").style.display = "block";

	if (data.winner === "draw"){
		tieGame();
	}
	else if (data.winner){
		winGame();
	}
	else{
		loseGame();
	}
	
});



function Square(){
	var square = document.createElement("BUTTON");
	square.setAttribute("class","square");
	square.onclick = function(){
		console.log("click",this.id);

		//can't pass socket here, it causes a stack overflow error
		socket.emit("square press", {id:this.id});
	};

	var squareContent = document.createTextNode("");
	square.appendChild(squareContent);

	return square;
}


function drawBoard(){
	for (var row = 0; row < 3; row ++){
		//create a Div for that row
		var tempDiv = document.createElement("DIV");
		document.getElementById("boardDIV").appendChild(tempDiv);

		for (var col = 0; col < 3; col ++){
			//create and label squares
			var tempSquare = new Square();
			var id = "s" + row + col;
		 	tempSquare.id = id;
		 	tempDiv.appendChild(tempSquare);
		}
	}
}


function drawNewGameButton(newGameClickHandler){
	//create new div
	var newDiv = document.createElement("DIV");
	
	
	//create button
	var newGameButton = document.createElement("BUTTON");
	newGameButton.className = "newGame";
	newGameButton.id = "newGameButton";
	newGameButton.onclick = function(){socket.emit("new game")};

	//create text node
	var newGameText = document.createTextNode("New Game");
	newGameText.id = "newGameText";

	
	//put 'em all on screen
	document.getElementById("boardDIV").appendChild(newDiv);
	newDiv.appendChild(newGameButton);
	newGameButton.appendChild(newGameText);
}

function updateViewSquare(pressedSquare, playerToken){
	//update view with current player's token

	//make squares start with these, just update text
	pressedSquare.firstChild.nodeValue = playerToken
	pressedSquare.disabled = "true";
}

function disableAllSquares(){
	//disable click input on unused squares, keeps Xs and Os
	var squares = document.getElementsByClassName("square");
	//returns a node list, must be iterated through, can't use forEach =(

	for (var i = 0; i < squares.length; i++){
		squares[i].disabled = true;
	}
}

function resetView(){
	//re-enable buttons and clear Xs and Os
	var squares = document.getElementsByClassName("square");
	//returns a node list, must be iterated through, can't use forEach =(

	for (var i = 0; i < squares.length; i++){
		squares[i].disabled = false;
		squares[i].firstChild.nodeValue = "";
	}

	document.getElementById("gameOverText").style.display = "none";
}

function updateViewFromModel(data){
	for (var row = 0; row < data.grid.length; row++){
		for(var col = 0; col < data.grid[row].length; col++){
			if (data.grid[row][col] != "_"){
				var square = document.getElementById("s"+row+col);
				square.firstChild.nodeValue = data.grid[row][col];
				square.disabled = true;

			}
		}
	}
}




function winGame(){
	document.getElementById("gameOverText").innerHTML = "You WON!";
	document.getElementById("messageDIV").style.color = "green";

}
	
function loseGame(){
	document.getElementById("gameOverText").innerHTML = "You LOST!";
	document.getElementById("messageDIV").style.color = "red";
}	

function drawGame(){
	document.getElementById("gameOverText").innerHTML = "You tied.";
	document.getElementById("messageDIV").style.color = "orange";
}
	

