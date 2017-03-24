var ws = new WebSocket("ws://localhost:8080/");

ws.onopen = function() {
	doAll();
};

ws.onmessage = function (evt) {
	str = evt.data;
	console.log(str);
	if (str.startsWith("artist")){
		document.getElementById("retour").disabled = true;
		str = str.substring(6);
		var res = str.split(", ");
		var option = "<option>"
		$("form").empty();
		$("form").append("<select name=\"ArtistSelect\" onChange=\"artiste()\">");
		$("select").append(option.concat("Choisir un artiste"));
		for (var i in res) {
			console.log(i);
			$("select").append(option.concat(res[i]));
		}
	}
	else{
		if (str.startsWith("song")){
			str = str.substring(4);
			var res = str.split(", ")
			var option = "<option>"
			$("form").empty();
			$("form").append("<select name=\"choixSong\" onChange=\"song()\">");
			$("select").append(option.concat("Choisir une chanson"));
			for (var i in res) {
				console.log(i);
				$("select").append(option.concat(res[i]));
			}
			document.getElementById("retour").disabled = false;
		}
		else{
			document.getElementById("p1").innerHTML = evt.data;
		}
	}
};

ws.onclose = function() {
};

ws.onerror = function(err) {
    alert("Error: " + err);
	close();
};

function closeWindow(){
				overwolf.windows.getCurrentWindow(function(result){
					if (result.status=="success"){
						overwolf.windows.close(result.window.id);
					}
				});
			};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dragResize(edge){
				overwolf.windows.getCurrentWindow(function(result){
					if (result.status=="success"){
						overwolf.windows.dragResize(result.window.id, edge);
					}
				});
			};
			
			function dragMove(){
				overwolf.windows.getCurrentWindow(function(result){
					if (result.status=="success"){
						overwolf.windows.dragMove(result.window.id);
					}
				});
			};
			
			function closeWindow(){
				overwolf.windows.getCurrentWindow(function(result){
					if (result.status=="success"){
						overwolf.windows.close(result.window.id);
					}
				});
			};
			
function whichPlaying(){
	ws.send("whichPlaying");
}

function whichWaiting(){
	ws.send("whichWaiting");
}

function next(){
	ws.send("Next");
}

function playPause(){
	ws.send("playPause");
}

async function doAll(){
	while(0<1){
		whichPlaying();
		await sleep(2000);
		whichWaiting();
		await sleep(1000);
	}
}

function artiste() {
	i = document.ArtistForm.ArtistSelect.selectedIndex;
	if (i==0) return;
	ws.send("artist".concat(document.ArtistForm.ArtistSelect.options[i].value));
}

function retour() {
	ws.send("giveMeArtist");
}

function song() {
	i = document.ArtistForm.choixSong.selectedIndex;
	if (i==0) return;
	ws.send("song".concat(document.ArtistForm.choixSong.options[i].value));
}