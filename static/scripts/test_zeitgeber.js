	//init Sektion

	var zeitgeber_wiederholung = false;
	var zeitgeber_lautstarke = 50; // 50/100
	var zeitgeber_audio_datei = ""; //ein datei
	var zeitgeber_warnungen;
	var zeitgeber_klang = document.getElementById("zeitgeber_klang");
	var zeitgeber_subtitle;
	var zeitgeber_erwartet = 0; //init zu null
	var zeitgeber_nachricht = "Fertig!"; //die alert zeitgeber_nachricht
	 //25 minuten
	var zeitgeber_zustand = "stopp"; //start, stopp, pause, lauf, ende ...
	var zeitgeber_interval = 1000; //ein sekunde
	var zeitgeber_aktuelle_zeit;
	var zeitgeber_ziel_zeit;
	var zeitgeber_dt;
	var zeitgeber_verstrichene_zeit_ms = 0; //die
	var zeitgeber_verstrichene_zeit_stunden = 0;
	var zeitgeber_verstrichene_zeit_minuten = 0;
	var zeitgeber_verstrichene_zeit_sekunden = 0;
	var zeitgeber_uhr_timeout;

	var zeitgeber_input_hours = document.getElementById("zeitgeber_input_hours").value;
	var zeitgeber_input_minutes = document.getElementById("zeitgeber_input_minutes").value;
	var zeitgeber_input_seconds = document.getElementById("zeitgeber_input_seconds").value;

	var zeitgeber_ziel_offset = zeitgeber_input_hours*60*60*1000 + zeitgeber_input_minutes*60*1000 + zeitgeber_input_seconds*1000;

	document.getElementById("zeitgeber_stunden").innerText = zeitgeber_input_hours.toString().padStart(2, '0');
	document.getElementById("zeitgeber_minuten").innerText = zeitgeber_input_minutes.toString().padStart(2, '0');
	document.getElementById("zeitgeber_sekunden").innerText = zeitgeber_input_seconds.toString().padStart(2, '0');

    //setTimeout("zeitgeber_klang.pause()", 1000);

	//start funktion
	function zeitgeber_start(){
		//alert(ziel_offset);
		zeitgeber_aktuelle_zeit = Date.now();
		zeitgeber_ziel_zeit = zeitgeber_aktuelle_zeit + zeitgeber_ziel_offset;
		zeitgeber_erwartet = zeitgeber_aktuelle_zeit + zeitgeber_interval;
		zeitgeber_uhr_timeout = setTimeout(zeitgeber_uhr, zeitgeber_interval);
		zeitgeber_zustand = "lauf";
		zeitgeber_druck_zeit();
	}

	//lauf
	function zeitgeber_uhr(){

	zeitgeber_aktuelle_zeit = Date.now();

	if(zeitgeber_aktuelle_zeit >= zeitgeber_ziel_zeit){
		zeitgeber_zustand = "ende";
		zeitgeber_ende();

	}else if (zeitgeber_zustand == "pause"){

		zeitgeber_ziel_zeit += zeitgeber_interval;

	}else if (zeitgeber_zustand == "lauf"){

		zeitgeber_dt = zeitgeber_erwartet - zeitgeber_aktuelle_zeit;//zeit delta
	}

	if (zeitgeber_zustand != 'ende' && zeitgeber_zustand != 'stopp' && zeitgeber_zustand != 'uberlauf'){
		zeitgeber_erwartet += zeitgeber_interval;
		zeitgeber_uhr_timeout = setTimeout(zeitgeber_uhr, zeitgeber_interval + zeitgeber_dt); //wann timeout ist zu schnell, wie 800ms statt 1000, dt ist 200ms (aufholen)
		zeitgeber_druck_zeit();
		}
	}

	//druck_zeit
	function zeitgeber_druck_zeit(){

		//To do berechnen Sie die stunden, minuten, sekunden , und drucken Sie diese zum bildshirm
		zeitgeber_verstrichene_zeit_ms = zeitgeber_ziel_zeit - zeitgeber_erwartet;//5000 - 2000 = 3000

		//von ms zu stunden/minuten/sekunden einheiten  3.000ms
		//ms // 1000 = 3s

		//700.000ms -> minuten 700.000ms // 60*1000

		//413.132.234ms // 60*60*1000 -> anzahl von stunden

		//(413.432.234ms - (anzahl_von_stunden*60*60*1000) umwandlung von stunden -> ms) ist die verbleine ms ausserhalb stunden
		//verbleine ms ausserhalb stunden // 60*1000 -> anzahl von minuten

		// (413.132.234ms - (menge von ms in die stunden) - (mengen von ms und die minuten)) // 1000

		//2:24:33 also 2 stunden, 24 minuten, 33 sekunden

		zeitgeber_verstrichene_zeit_stunden = Math.floor(zeitgeber_verstrichene_zeit_ms / (60*60*1000));
		zeitgeber_verstrichene_zeit_minuten = Math.floor( (zeitgeber_verstrichene_zeit_ms - zeitgeber_verstrichene_zeit_stunden*60*60*1000) / (60*1000));
		zeitgeber_verstrichene_zeit_sekunden = Math.floor( (zeitgeber_verstrichene_zeit_ms - zeitgeber_verstrichene_zeit_stunden*60*60*1000 - zeitgeber_verstrichene_zeit_minuten*60*1000 ) / (1000));

		//drucken die einheiten auf die bildschirm
		document.getElementById("zeitgeber_stunden").innerText = (zeitgeber_verstrichene_zeit_stunden.toString()).padStart(2, '0');
		document.getElementById("zeitgeber_minuten").innerText = (zeitgeber_verstrichene_zeit_minuten.toString()).padStart(2, '0');
		document.getElementById("zeitgeber_sekunden").innerText = (zeitgeber_verstrichene_zeit_sekunden.toString()).padStart(2, '0');

	}

	//pause
	function zeitgeber_pause(){
		zeitgeber_zustand = (zeitgeber_zustand == 'pause') ? 'start' : 'pause';
		document.getElementById("zeitgeber_pause_btn").innerText  = (zeitgeber_zustand == 'pause') ? 'fortsetzen' : 'Pause';
	}

	//stopp
	function zeitgeber_stopp(){

		clearTimeout(zeitgeber_uhr_timeout);

		zeitgeber_verstrichene_zeit_ms = 0; //die
		zeitgeber_verstrichene_zeit_stunden = 0;
		zeitgeber_verstrichene_zeit_minuten = 0;
		zeitgeber_verstrichene_zeit_sekunden = 0;

		zeitgeber_input_hours = document.getElementById("zeitgeber_input_hours").value;
		zeitgeber_input_minutes = document.getElementById("zeitgeber_input_minutes").value;
		zeitgeber_input_seconds = document.getElementById("zeitgeber_input_seconds").value;

		document.getElementById("zeitgeber_stunden").innerText = zeitgeber_input_hours.toString().padStart(2, '0');
		document.getElementById("zeitgeber_minuten").innerText = zeitgeber_input_minutes.toString().padStart(2, '0');
		document.getElementById("zeitgeber_sekunden").innerText = zeitgeber_input_seconds.toString().padStart(2, '0');

		zeitgeber_zustand = 'stopp';
	}

	//ende
	function zeitgeber_ende(){
		zeitgeber_klang.play();
		clearTimeout(zeitgeber_uhr_timeout);
	    zeitgeber_stopp()
	}

	function zeitgeber_uberlauf(){

	}
