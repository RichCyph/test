	//init Sektion
	
	var wiederholung = false;
	var lautstarke = 50; // 50/100
	var audio_datei = ""; //ein datei
	var warnungen;
	var klang = document.getElementById("klang");
	var subtitle;
	var erwartet = 0; //init zu null
	var nachricht = "Fertig!"; //die alert nachricht
	 //25 minuten
	var zustand = "stopp"; //start, stopp, pause, lauf, ende ...
	var interval = 1000; //ein sekunde
	var aktuelle_zeit;
	var ziel_zeit;
	
	var verstrichene_zeit_ms = 0; //die 
	var verstrichene_zeit_stunden = 0;
	var verstrichene_zeit_minuten = 0;
	var verstrichene_zeit_sekunden = 0;
	var uhr_timeout;
	
	input_hours = document.getElementById("input_hours").value;
	input_minutes = document.getElementById("input_minutes").value;
	input_seconds = document.getElementById("input_seconds").value;

	var ziel_offset = input_hours*60*60*1000 + input_minutes*60*1000 + input_seconds*1000;
	
	document.getElementById("stunden").innerText = input_hours.toString().padStart(2, '0');
	document.getElementById("minuten").innerText = input_minutes.toString().padStart(2, '0');
	document.getElementById("sekunden").innerText = input_seconds.toString().padStart(2, '0');
	
    //setTimeout("klang.pause()", 1000);
	
	//start funktion
	function start(){
		//alert(ziel_offset);
		aktuelle_zeit = Date.now();
		ziel_zeit = aktuelle_zeit + ziel_offset;
		erwartet = aktuelle_zeit + interval;
		uhr_timeout = setTimeout(uhr, interval);
		zustand = "lauf";
		druck_zeit();	
	}
	
	//lauf
	function uhr(){
	
	aktuelle_zeit = Date.now();
	
	if(aktuelle_zeit >= ziel_zeit){
		zustand = "ende";
		ende();
		
	}else if (zustand == "pause"){
	
		ziel_zeit += interval;
		
	}else if (zustand == "lauf"){
	
		dt = erwartet - aktuelle_zeit;//zeit delta 
	}
	
	if (zustand != 'ende' && zustand != 'stopp' && zustand != 'uberlauf'){
		erwartet += interval;
		uhr_timeout = setTimeout(uhr, interval + dt); //wann timeout ist zu schnell, wie 800ms statt 1000, dt ist 200ms (aufholen)
		druck_zeit();
		}
	}
	
	//druck_zeit
	function druck_zeit(){
		
		//To do berechnen Sie die stunden, minuten, sekunden , und drucken Sie diese zum bildshirm 
		verstrichene_zeit_ms = ziel_zeit - erwartet;//5000 - 2000 = 3000
		
		//von ms zu stunden/minuten/sekunden einheiten  3.000ms
		//ms // 1000 = 3s
		
		//700.000ms -> minuten 700.000ms // 60*1000
		
		//413.132.234ms // 60*60*1000 -> anzahl von stunden
		
		//(413.432.234ms - (anzahl_von_stunden*60*60*1000) umwandlung von stunden -> ms) ist die verbleine ms ausserhalb stunden
		//verbleine ms ausserhalb stunden // 60*1000 -> anzahl von minuten 
		
		// (413.132.234ms - (menge von ms in die stunden) - (mengen von ms und die minuten)) // 1000
	
		//2:24:33 also 2 stunden, 24 minuten, 33 sekunden
		
		verstrichene_zeit_stunden = Math.floor(verstrichene_zeit_ms / (60*60*1000));
		verstrichene_zeit_minuten = Math.floor( (verstrichene_zeit_ms - verstrichene_zeit_stunden*60*60*1000) / (60*1000));
		verstrichene_zeit_sekunden = Math.floor( (verstrichene_zeit_ms - verstrichene_zeit_stunden*60*60*1000 - verstrichene_zeit_minuten*60*1000 ) / (1000));
		
		//drucken die einheiten auf die bildschirm
		document.getElementById("stunden").innerText = (verstrichene_zeit_stunden.toString()).padStart(2, '0');
		document.getElementById("minuten").innerText = (verstrichene_zeit_minuten.toString()).padStart(2, '0');
		document.getElementById("sekunden").innerText = (verstrichene_zeit_sekunden.toString()).padStart(2, '0');
		
	}
	
	//pause
	function pause(){
		zustand = (zustand == 'pause') ? 'start' : 'pause';
		document.getElementById("pause_button").innerText  = (zustand == 'pause') ? 'Fortsetzen' : 'Pause';
	}
	
	//stopp
	function stopp(){
	
		clearTimeout(uhr_timeout);
		
		verstrichene_zeit_ms = 0; //die 
		verstrichene_zeit_stunden = 0;
		verstrichene_zeit_minuten = 0;
		verstrichene_zeit_sekunden = 0;
	
		input_hours = document.getElementById("input_hours").value;
		input_minutes = document.getElementById("input_minutes").value;
		input_seconds = document.getElementById("input_seconds").value;
		
		document.getElementById("stunden").innerText = input_hours.toString().padStart(2, '0');
		document.getElementById("minuten").innerText = input_minutes.toString().padStart(2, '0');
		document.getElementById("sekunden").innerText = input_seconds.toString().padStart(2, '0');
	
		zustand = 'stopp';	
	}
	
	//ende
	function ende(){
		
		klang.play();
		clearTimeout(uhr_timeout);
	    stopp()
	}
	
	function uberlauf(){
		
	}