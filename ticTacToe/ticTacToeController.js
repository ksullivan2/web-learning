//THIS IS THE SERVER SIDE FILE THAT WILL RUN

"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("public"));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



var AI = require("./ticTacToeAI.js");
var BoardModel = require("./ticTacToeModel.js");





io.on('connection', function(socket){
  console.log('a user connected');

  //update the view when the person first enters the "room"
  socket.emit('update view', {grid: controller.board.grid});

  //add them to the game if there's room, else tell them room is full
  var roomNotFull = controller.board.addPlayer(socket);
  	if (!roomNotFull){socket.emit("room full")}
  	//if 2 players are in the room, start the game
  	else if (controller.board.players.length ==2){
  		//this will clear any messages and enable the buttons
  		io.sockets.emit('reset view');
  		//tell the first person to enter the room that it's their turn
  		socket.broadcast.emit('your turn');
  		//tell the last person to enter the room to wait for a move
  		socket.emit('wait for move');
  	};


  socket.on('disconnect', function(socket){
  	console.log("user disconnect")

  	//this doesn't work because once the user connects, i lose the socket information.
  	for (var i =0; i< controller.board.players.length; i++){
  		if (controller.board.players[i].socket === socket){
  			controller.board.players.slice(i,1);
  			console.log("removed player", controller.board.players)
  		};
  	};
  });

  socket.on("new game", function(){
  	controller.board.newGame();
  	io.sockets.emit('reset view');

  	if (controller.board.isItPlayersTurn(socket)){
  		socket.emit('your turn');
  		socket.broadcast.emit('wait for move');
  	}
  	else {
  		socket.emit('wait for move');
  		socket.broadcast.emit('your turn');
  	};
 
  });

  socket.on('square press', function(data){
  	//update model

  	var validMove = controller.board.updateModelSquare(data, socket);

  	//update the view from the model
  	if (validMove){
  		io.sockets.emit('update view', {grid: controller.board.grid});
  		controller.board.swapTurn();
  		socket.emit('wait for move');
  		socket.broadcast.emit('your turn');
  	}

	//check if the game has been won
	if (controller.board.checkForWin()){
		if (socket === controller.board.findPlayerSocketBasedOnToken(controller.board.winner)){
			socket.emit("game over", {winner: "you"});
			socket.broadcast.emit("game over", {winner: "notYou"});
		}
	}
	else if(controller.board.checkForDraw()){
			io.sockets.emit("game over", {winner: "draw"})
	};


  });

  

});



//CONTROLLER
"use strict";


function Controller(){};


Controller.prototype.computerMove = function(){
	//updates the model to the computer's next best possible move
	this.board = minimax(this.board, -1);
	this.updateViewFromModel();

	//check if the game has been won
	if (this.board.checkForWin()){
		console.log("computer check for win")
		this.winGame()	
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




var controller = new Controller();

//create model instance
controller.board = new BoardModel();

