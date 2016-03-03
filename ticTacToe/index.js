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

io.on('connection', function(socket){
  console.log('a user connected');
});





var AI = require("./ticTacToeAI.js");
var BoardModel = require("./ticTacToeModel.js");
var Controller = require("./ticTacToeController.js");
var io = require('socket.io')


function runner(){
	//create controller object
	var controller = new Controller();

	//create model instance
	controller.board = new BoardModel();
}


runner()

 