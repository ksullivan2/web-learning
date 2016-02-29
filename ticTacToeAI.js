

function minimax(board){

	if (board.checkForWin()){
		if (board.winner === "X"){
			return 10;
		}
		else{
			return -10;
		}
	}
	
	if (board.checkForDraw()){
		return 0;
	}
	
}