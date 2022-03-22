	//init Sektion
	
	var stoppwatch_wiederholung = false;
	var stoppwatch_lautstarke = 50; // 50/100
	var stoppwatch_audio_datei = ""; //ein datei
	var stoppwatch_warnungen;
	var stoppwatch_klang = document.getElementById("stoppwatch_klang");
	var stoppwatch_subtitle;
	var stoppwatch_erwartet = 0; //init zu null
	var stoppwatch_nachricht = "Fertig!"; //die alert stoppwatch_nachricht
	
	 //25 minuten
	var stoppwatch_zustand = "stopp"; //start, stopp, pause, lauf, ende ...
	var stoppwatch_interval = 1000; //ein sekunde
	
	var stoppwatch_start_zeit;
	var stoppwatch_aktuelle_zeit;
	var stoppwatch_pause_zeit = 0; //muss bei null starten?
	var stoppwatch_dt;
	var stoppwatch_verstrichene_zeit_ms = 0;
	var stoppwatch_verstrichene_zeit_stunden = 0;
	var stoppwatch_verstrichene_zeit_minuten = 0;
	var stoppwatch_verstrichene_zeit_sekunden = 0;
	var stoppwatch_uhr_timeout;
	
	var stoppwatch_input_hours = 0;
	var stoppwatch_input_minutes = 0;
	var stoppwatch_input_seconds = 0;

	var stoppwatch_ziel_offset;// = stoppwatch_input_hours*60*60*1000 + stoppwatch_input_minutes*60*1000 + stoppwatch_input_seconds*1000;
	
	document.getElementById("stoppwatch_stunden").innerText = stoppwatch_input_hours.toString().padStart(2, '0');
	document.getElementById("stoppwatch_minuten").innerText = stoppwatch_input_minutes.toString().padStart(2, '0');
	document.getElementById("stoppwatch_sekunden").innerText = stoppwatch_input_seconds.toString().padStart(2, '0');
		
	//start funktion
	function stoppwatch_start(){
		//alert(ziel_offset);
		stoppwatch_aktuelle_zeit = Date.now();
		stoppwatch_start_zeit = Date.now();
		
		stoppwatch_ziel_zeit = stoppwatch_aktuelle_zeit;
		stoppwatch_erwartet = stoppwatch_aktuelle_zeit;
		stoppwatch_uhr_timeout = setTimeout(stoppwatch_uhr, stoppwatch_interval);
		stoppwatch_zustand = "lauf";
		stoppwatch_druck_zeit();
		
	}
	
	//lauf
	function stoppwatch_uhr(){
	
	stoppwatch_aktuelle_zeit = Date.now();
	stoppwatch_erwartet += stoppwatch_interval;
	stoppwatch_dt = stoppwatch_erwartet - stoppwatch_aktuelle_zeit;	

		
	if (stoppwatch_zustand == 'pause'){
		
		stoppwatch_pause_zeit += stoppwatch_interval;
		}

	stoppwatch_uhr_timeout = setTimeout(stoppwatch_uhr, stoppwatch_interval + stoppwatch_dt); //wann timeout ist zu schnell, wie 800ms statt 1000, dt ist 200ms (aufholen)
	stoppwatch_druck_zeit();
	
	}
	
	//druck_zeit
	function stoppwatch_druck_zeit(){
		
		//To do berechnen Sie die stunden, minuten, sekunden , und drucken Sie diese zum bildshirm 
		stoppwatch_verstrichene_zeit_ms = stoppwatch_erwartet - stoppwatch_start_zeit - stoppwatch_pause_zeit;//5000 - 2000 = 3000
				
		stoppwatch_verstrichene_zeit_stunden = Math.floor(stoppwatch_verstrichene_zeit_ms / (60*60*1000));
		stoppwatch_verstrichene_zeit_minuten = Math.floor( (stoppwatch_verstrichene_zeit_ms - stoppwatch_verstrichene_zeit_stunden*60*60*1000) / (60*1000));
		stoppwatch_verstrichene_zeit_sekunden = Math.floor( (stoppwatch_verstrichene_zeit_ms - stoppwatch_verstrichene_zeit_stunden*60*60*1000 - stoppwatch_verstrichene_zeit_minuten*60*1000 ) / (1000));
		
		//drucken die einheiten auf die bildschirm
		document.getElementById("stoppwatch_stunden").innerText = (stoppwatch_verstrichene_zeit_stunden.toString()).padStart(2, '0');
		document.getElementById("stoppwatch_minuten").innerText = (stoppwatch_verstrichene_zeit_minuten.toString()).padStart(2, '0');
		document.getElementById("stoppwatch_sekunden").innerText = (stoppwatch_verstrichene_zeit_sekunden.toString()).padStart(2, '0');
	}
	
	//pause
	function stoppwatch_pause(){
		stoppwatch_zustand = (stoppwatch_zustand == 'pause') ? 'lauf' : 'pause';
		document.getElementById("stoppwatch_pause_btn").innerText  = (stoppwatch_zustand == 'pause') ? 'fort' : 'pause';
	
	}
	
	//stopp
	function stoppwatch_stopp(){
	
		clearTimeout(stoppwatch_uhr_timeout);
		
		stoppwatch_verstrichene_zeit_ms = 0;
		stoppwatch_verstrichene_zeit_stunden = 0;
		stoppwatch_verstrichene_zeit_minuten = 0;
		stoppwatch_verstrichene_zeit_sekunden = 0;
		
		stoppwatch_input_hours = 0;//document.getElementById("stoppwatch_input_hours").value;
		stoppwatch_input_minutes = 0;//document.getElementById("stoppwatch_input_minutes").value;
		stoppwatch_input_seconds = 0;//document.getElementById("stoppwatch_input_seconds").value;
		 
		stoppwatch_pause_zeit = 0
		
		document.getElementById("stoppwatch_stunden").innerText = stoppwatch_input_hours.toString().padStart(2, '0');
		document.getElementById("stoppwatch_minuten").innerText = stoppwatch_input_minutes.toString().padStart(2, '0');
		document.getElementById("stoppwatch_sekunden").innerText = stoppwatch_input_seconds.toString().padStart(2, '0');
	
		stoppwatch_zustand = 'stopp';
	}
	