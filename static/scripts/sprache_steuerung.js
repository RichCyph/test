
//sprache_steuerung

var sprache_skript = document.createElement("script");
sprache_skript.type = "text/javascript";
sprache_skript.src = "scripts/lang_" + global_sprachen_auswahl + ".js";
document.getElementById("body_in_id").appendChild(sprache_skript);


var sprache_set_skript = document.createElement("script");
sprache_set_skript.type = "text/javascript";
sprache_set_skript.src = "scripts/sprache_set.js";
document.getElementById("body_in_id").appendChild(sprache_set_skript);


