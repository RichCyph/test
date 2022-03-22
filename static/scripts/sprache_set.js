//sprache_set

function sprache_set(){
	
	document.getElementById("logo_title_id").innerText = sprache.logo_title;
	document.getElementById("arbeit_title_id").innerText = sprache.morgengruss;
	document.getElementById("tageszeit").innerText = sprache.morgengruss;

	document.getElementById("zeit_title_id").innerText = sprache.zeit;
	
	document.getElementById("date_title_id").innerText = sprache.datum;
	
	document.getElementById("suche_title_id").innerText = sprache.suche;
	document.getElementById("lesezeichen_title_id").innerText = sprache.lesezeichen;
	document.getElementById("arbeit_title_id").innerText = sprache.arbeit;
	document.getElementById("lernen_title_id").innerText = sprache.lernen;
	document.getElementById("geld_title_id").innerText = sprache.geld;
	document.getElementById("sozial_title_id").innerText = sprache.sozial;
	document.getElementById("musik_title_id").innerText = sprache.musik;
	document.getElementById("spiele_title_id").innerText = sprache.spiele;
	
	document.getElementById("zeitgeber_title_id").innerText = sprache.zeitgeber;
	document.getElementById("start_button").innerText = sprache.zeitgeber_start;
	document.getElementById("stopp_button").innerText = sprache.zeitgeber_stopp;
	document.getElementById("pause_button").innerText = sprache.zeitgeber_pause;
	document.getElementById("timer_modal_form_open_button").innerText = sprache.zeitgeber_bearbeiten;
	
	document.getElementById("kryptowahrung_title_id").innerText = sprache.kryptowahrung;    
	
};


sprache_set();