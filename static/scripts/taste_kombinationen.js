
var suche_option_wb = new Map();
					
					suche_option_wb.set("!g ","https://www.google.com/search?q=");
					suche_option_wb.set("!y ","https://www.youtube.com/results?search_query=trance");
					suche_option_wb.set("!w ","https://de.wikipedia.org/w/index.php?search=");

$(document).keydown(function(e) {
	
	PlaySound("mykeySound");
	
	// Hot key ideas
	// _a = 65
	// _l = 76
	// _b = 66
	// _w = 87
	// _h = 72
	// _o = 84
	
	if ( ( e.which === 13 ) && $('#suche_input').is(':focus') ) {
		PlaySound("mygoSound");
		var ziel = document.getElementById("suche_input").value;
		if(ziel.length > 2 && suche_option_wb.has(ziel.slice(0, 3))){
			window.open(suche_option_wb.get(ziel.slice(0, 3)) + ziel.slice(3));
		}
		else if(kurz_taste_wb.has(ziel)){
			window.open(kurz_taste_wb.get(ziel));
		}
		else{
			window.open('https://google.com/search?q='+ziel);
		}
	} 
	
});
