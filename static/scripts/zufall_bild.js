
var images=['images/000.jpg', 
'images/001.png', 
'images/0010.jpg', 
 'images/0012.jpg',
 'images/0013.jpg', 
 'images/0014.jpg', 
 'images/0015.jpg', 
 'images/0017.png', 
 'images/0018.jpg', 
 'images/002.jpg',
 'images/0020.jpg',
 'images/0021.jpg', 
 'images/0022.png', 
 'images/0023.png',
 'images/0024.png',
 'images/0025.png',
 'images/0026.png',
 'images/0028.png', 
 'images/0029.png',
 'images/003.jpg',
 'images/0030.jpg',
 'images/0031.jpg',
 'images/0032.jpg', 
 'images/0033.jpg', 
 'images/0034.jpg',
 'images/0036.jpg', 
 'images/0037.png',
 'images/0038.png',
 'images/004.jpg', 
 'images/005.jpg',
 'images/006.jpg', 
 'images/007.jpg', 
 'images/008.jpg', 
 'images/009.jpg'];

var randomNumber = Math.floor(Math.random() * images.length);
var bgImg = "http://127.0.0.1:5000/static/" + images[randomNumber];


document.body.style.backgroundImage = "url("+bgImg+")";
document.body.style.backgroundPosition = "center 30%";
document.body.style.backgroundSize = "stretch";
document.getElementById("suche_input").focus();