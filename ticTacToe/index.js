"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});





var AI = require("./ticTacToeAI.js");
var BoardModel = require("./ticTacToeModel.js");
var Controller = require("./ticTacToeController.js");


function runner(){
	//create controller object
	var controller = new Controller();

	//create model instance
	controller.board = new BoardModel();
}


runner()

 