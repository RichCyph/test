
/*
	NOTE:

	"Global query list":

	Defined in hallo.html in the krypto section
	and each set of acronyms are pushed into the list.
*/

var get_csrf_token = function() {
    var cookieValue = null,
        name = 'csrftoken';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

function myWetter(art, api_url, listItem) {
//	console.log(get_csrf_token());

    var xhttp = new XMLHttpRequest();
	xhttp.responseType = 'json';
//  xhttp.setRequestHeader('X-CSRFToken', get_csrf_token());
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {

			var data = this.response.data.amount;


			span1 = listItem.getElementsByClassName("krypto_info_links--blau")[0];
			span2 = listItem.getElementsByClassName("krypto_info_rechts--weiss")[0];

			span1.innerText = art;
			span2.innerText = data;

         }
    };

    xhttp.open("GET", api_url, true);
    xhttp.send();
}

function ruf_alle_queries(){
	var i;

	const ul = document.getElementById('munzen');
	const listItems = ul.getElementsByTagName('li');

	for (i = 0; i < listItems.length; i++) {
		var krypto = listItems[i].children[0].innerText;//global_query_liste2[i][0];//initialized in hallo.html in krypto jinja
		var fiat = listItems[i].children[1].innerText;//global_query_liste2[i][1];
    console.log(krypto);
		var query = "https://api.coinbase.com/v2/prices/"+krypto+"-"+fiat+"/buy";
		var id =  listItems[i].children[2].innerText;//global_query_liste2[i][2];
		myWetter(krypto, query, listItems[i]);
		}
};

ruf_alle_queries();

var munzen_scan_urh = setInterval(munzen_scan, 1000*60*60);

function munzen_scan(){

	var ul = document.getElementById("munzen");
	ul.innerText = "";

	ruf_alle_queries();

}
