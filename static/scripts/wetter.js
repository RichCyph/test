


var myVar = setInterval(myWetter, 10*60*1000);
var key = "cb5d35b9624e0f9a70b023db43de964f"
var latlon = "lat=" + global_lat + "&lon=" + global_lon; //lat lon von global_einstellungen or hallo.html
var api_url = "https://api.openweathermap.org/data/2.5/onecall?" + latlon + "&lang=de&units=metric&exclude=minutely&appid=" + key

function myWetter() {
    var xhttp = new XMLHttpRequest();
	xhttp.responseType = 'json';

    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			 document.getElementById("temp").innerText = this.response.current.temp;
			 document.getElementById("gefuhl").innerText = this.response.current.weather[0].main;
		 }
		 document.getElementById("wetter_standort").innerText = global_lande_texte;
    };
    xhttp.open("GET", api_url, true);
    xhttp.send();
}

myWetter()
         