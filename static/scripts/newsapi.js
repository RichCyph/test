
<!DOCTYPE html>
<html lang="en">
<head>
<title>Cel50</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>



</head>
<body>

<div class="m_nachricht">


<h3 class="nachricht_text" id="gefuhl"></h3>

</div>

var news_api_schlussel = ba038c5fe9d2471ea7e57094577013d7;
var news_api_url = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+news_api_schlussel;


function nachricht() {
    var xhttp = new XMLHttpRequest();
	xhttp.responseType = 'json';

    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			 document.getElementById("nachricht_text").innerText = this.response.text;
         }
    };
    xhttp.open("GET", news_api_url, true);
    xhttp.send();
}

nachricht()


</body>

</html>


