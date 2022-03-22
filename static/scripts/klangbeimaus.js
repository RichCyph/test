function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
	thissound.pause();
    thissound.currentTime = 0;
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    
}

