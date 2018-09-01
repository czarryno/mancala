var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
var player = 1;
function playerTurn(player){
	if(player === 1){
		document.getElementById("playerTurn").innerHTML = "Player 1";
		for(var y = 12; y > 6; y--){
			document.getElementById("pit" + y).style.pointerEvents = "auto";
		}
		for(var x = 0; x < 6; x++){
			document.getElementById("pit" + x).style.pointerEvents = "none";
		}
	}
	else{
		document.getElementById("playerTurn").innerHTML = "Player 2";
		for(var w = 12; w > 6; w--){
			document.getElementById("pit" + w).style.pointerEvents = "none";
		}
		for(var v = 0; v < 6; v++){
			document.getElementById("pit" + v).style.pointerEvents = "auto";
		}
	}
}

function workToBeads(){
	var pitNumber;
	for(var i = 13; i > -1; i--){
		for(var j = 0; j < 4; j++){
			if(i === 13 || i === 6){
				break;
			}
			else{
				pitNumber = "pit" + i;
				addInitialBeads(pitNumber);
			}
		}
	}
}

function addInitialBeads(pitNumber){
	var beads = document.createElement('div');
	beads.classList.add("bead");
	var pitElement;
	pitElement = document.getElementById(pitNumber);
	pitElement.appendChild(beads);
}

function clickHandler(){
	for(var i = 0; i < 13; i++) {
		if(i === 13 || i === 6){
			continue;
		}
		const pit = i;
	    document.getElementById('pit' + pit).addEventListener('click', function(event) {
			event.preventDefault();
			clickBeads(pit);
		});
	}
}

function clickBeads(pitIndex){
	if(board[pitIndex] === 0){
		document.getElementById("message").innerHTML = "There are no pebbles here m8. Pick a new Pit.";
	}
	else{
		var children = document.getElementById("pit" + pitIndex);
		var pebbleCount = board[pitIndex];
		for(pebbleCount; pebbleCount > 0; pebbleCount--){
			board[pitIndex] -= 1;
			if(children.hasChildNodes()){
				children.removeChild(children.childNodes[pebbleCount - 1]);
			}
			overflowHelper = (pitIndex + pebbleCount);
			if(document.getElementById("playerTurn").innerHTML === "Player 2" && overflowHelper >= 13){
				helperBoardFunction(overflowHelper); 
				document.getElementById("message").innerHTML = "";
				helperBeadFunction(overflowHelper);
			}
			else if(document.getElementById("playerTurn").innerHTML === "Player 1" && overflowHelper >= 20){
				topBoardHelper(overflowHelper, pitIndex); 
				document.getElementById("message").innerHTML = "";
				topBeadHelper(overflowHelper, pitIndex);
			}
			else{
				document.getElementById("message").innerHTML = "";
				//alert(overflowHelper);
				editBoardNumber(overflowHelper);
				addNewBeads(overflowHelper);
			}
		}
		player = (player + 1) % 2;
		playerTurn(player);
		changeScore();
		checkWinnerBottom();
		checkWinnerTop();
		return;
		
	}
}

function topBoardHelper(overflowHelper, pitIndex){
	difference = overflowHelper - pitIndex - 1; //pebbleCount - 1
	//alert("difference: " + difference);
	if(overflowHelper <= 13){
		board[overflowHelper] += 1;
	}
	else{
		board[difference] += 1;
	}
}

function topBeadHelper(overflowHelper, pitIndex){
	difference2 = overflowHelper - pitIndex - 1;
	if(overflowHelper <= 13){
		addNewBeads(overflowHelper);
	}
	else{
		var newBeads2 = document.createElement("div");
		newBeads2.classList.add("bead");
		var currentPit3 = document.getElementById("pit" + difference2);
		currentPit3.appendChild(newBeads2);
	}
}

function helperBoardFunction(largeNumber){
	smallerNumber = largeNumber - 13;
	if(smallerNumber >= 0){
		//alert(smallerNumber);
		board[smallerNumber] += 1;
		//alert(board[smallerNumber]);
	}
}

function helperBeadFunction(largeNum){
	smallNum = largeNum - 13;
	if(smallNum >= 0){
		var newerBeads = document.createElement("div");
		newerBeads.classList.add("bead");
		var currentPit2 = document.getElementById("pit" + smallNum);
		currentPit2.appendChild(newerBeads);
	}
}

function editBoardNumber(pitNum){
	var row;
	if(pitNum >= 14){
		pitNum -= 14;
		//alert(pitNum);
	}
	board[pitNum] += 1;
}

function addNewBeads(pitNumber){
	if(pitNumber >= 14){
		pitNumber -= 14;
	}
	var newBeads = document.createElement("div");
	newBeads.classList.add("bead");
	var currentPit = document.getElementById("pit" + pitNumber);
	currentPit.appendChild(newBeads);
}

function changeScore(){
	var x = document.getElementById("pit13").childElementCount;
	var y = document.getElementById("pit6").childElementCount;
	document.getElementById("p1Score").innerHTML = x;
	document.getElementById("p2Score").innerHTML = y;
}

function checkWinnerBottom(){
	var count = 0;
	var beadCount = 0;
	
	for(var c = 0;  c < 6; c++){
		count += board[c];
	}
	if(count === 0){
		for(var t = 12; t > 6; t--){
			var children = document.getElementById("pit" + t);
			beadCount += parseInt(board[t]);
			help = parseInt(board[t]);
			for(help; help > 0; help--){
				board[t] -= 1;
				if(children.hasChildNodes()){
					children.removeChild(children.childNodes[help - 1]);
				}
			}
		}
		for(beadCount; beadCount > 0; beadCount--){
			//alert("yes");
			var newBeads = document.createElement("div");
			newBeads.classList.add("bead");
			var currentPit = document.getElementById("pit13");
			currentPit.appendChild(newBeads);
			
		}
		changeScore();
		var p1 = parseInt(document.getElementById("p1Score").innerHTML);
		var p2 = parseInt(document.getElementById("p2Score").innerHTML);
		if(p1 > p2){
			document.getElementById("message").innerHTML = "Player 1 Wins";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
		else if(p2 > p1){
			document.getElementById("message").innerHTML = "Player 2 Wins";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
		else{
			document.getElementById("message").innerHTML = "Its a draw feller";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
	}
}
function checkWinnerTop(){
	var count2 = 0;
	var beadCount2 = 0;
	var help = 0;
	for(var c = 12;  c > 6; c--){
		count2 += board[c];
	}
	if(count2 === 0){
		for(var q = 0; q < 6; q++){
			var children = document.getElementById("pit" + q);
			beadCount2 += parseInt(board[q]);
			help = parseInt(board[q]);
			for(help; help > 0; help--){
				board[q] -= 1;
				if(children.hasChildNodes()){
					children.removeChild(children.childNodes[help - 1]);
				}
			}
		}
		for(beadCount2; beadCount2 > 0; beadCount2--){
			var newBeads = document.createElement("div");
			newBeads.classList.add("bead");
			var currentPit = document.getElementById("pit6");
			currentPit.appendChild(newBeads);
		}
		changeScore();
		var p1 = parseInt(document.getElementById("p1Score").innerHTML);
		var p2 = parseInt(document.getElementById("p2Score").innerHTML);
		if(p1 > p2){
			document.getElementById("message").innerHTML = "Player 1 Wins";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
		else if(p2 > p1){
			document.getElementById("message").innerHTML = "Player 2 Wins";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
		else{
			document.getElementById("message").innerHTML = "Its a draw feller";
			for(var y = 0; y < 14; y++){
				document.getElementById("pit" + y).style.pointerEvents = "none";
			}
			document.getElementById("restart").style.visibility = "visible";
		}
	}
}

