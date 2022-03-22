
document.getElementById("benutzer_name").innerText = global_benutzer_name;

var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
	var ad = d.toLocaleDateString();
  document.getElementById("uhr").innerText = t;
	document.getElementById("datum").innerText = ad;

	document.getElementById("tageszeit").innerText = tageszeit_berechnen(d);
};

function tageszeit_berechnen(zeit){
	var stunden = parseInt(zeit.getHours());
	console.log(stunden);
	var tageszeit;

	if (stunden >= 5 && stunden < 12) {
		tageszeit = global_morgengruss;
	} else if (stunden >=12 && stunden < 17) {
		tageszeit = global_nachmittaggruss;
	} else if (stunden >= 17 && stunden < 20) {
		tageszeit = global_abendgruss;
	} else {
		tageszeit = global_nachtgruss;
	}

	return tageszeit;
};
