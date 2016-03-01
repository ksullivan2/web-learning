//VIEW
"use strict";

function Square(buttonClickHandler){
	var square = document.createElement("BUTTON");
	square.setAttribute("class","square");
	square.addEventListener("click", buttonClickHandler, false);

	var squareContent = document.createTextNode("");	
	square.appendChild(squareContent);

	//these don't work as expected in the CSS... look into that
	//square.style.height = "50px";
	//square.style.width = "50px";

	return square;
}


function drawBoard(buttonClickHandler){
	//not actually looping through an object here, just want the ranges
	for (var row = 0; row < 3; row ++){
		//create a Div for that row
		var tempDiv = document.createElement("DIV");
		document.body.appendChild(tempDiv);

		for (var col = 0; col < 3; col ++){
			//create and label squares
			var tempSquare = new Square(buttonClickHandler);
			var id = row + "," + col;
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
	newGameButton.addEventListener("click", newGameClickHandler, false);

	//create text node
	var newGameText = document.createTextNode("New Game");
	newGameText.id = "newGameText";

	
	//put 'em all on screen
	document.body.appendChild(newDiv);
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
}
