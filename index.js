var bg = document.querySelector(".bg");
var diff = document.querySelector(".diff");
var startbox = document.querySelector(".startbox");
var choose = document.querySelector(".choose");
var chooseBack = document.querySelector(".choose_back");
var start = document.querySelector(".start");
var show = document.querySelector(".show");
var innerscore = document.querySelector(".innerscore");
var innerlife = document.querySelector(".innerlife");
var overZhezhao = document.querySelector(".over_zhezhao");
var overscore = document.querySelector(".overscore");
var bestscore = document.querySelector(".bestscore");
var overReset = document.querySelector(".over_reset");
var overQuit = document.querySelector(".over_quit");
var stop = document.querySelector(".stop");
var pauseZhezhao = document.querySelector(".pause_zhezhao");
var continueBtn = document.querySelector(".continue"); 
var stopReset = document.querySelector(".stop_reset");
var stopQuit = document.querySelector(".stop_quit");
// var chooseBtn = document.querySelectorAll(".choosebox div")

var easy = document.querySelector(".easy");
var medium = document.querySelector(".medium");
var hard = document.querySelector(".hard");
var music = document.querySelector(".music");
var audio = document.querySelector("audio");
var daojishi = document.querySelector(".daojishi");
var djs_img = document.querySelector(".daojishi img")

var data = {};
var score = 0;
var life = 5;
var count = 3;
var t;
var speed = 5;
var best_defen = localStorage.score?localStorage.score:0;


function init(){
	score = 0;
	innerscore.innerHTML = score;
	life = 5;
	innerlife.innerHTML = life;
	innerlife.style.backgroundSize = "100% 100%";
	speed = 5;
	for(var i in data){
		bg.removeChild(data[i].ele);
	}
	data = {};
}

function create(){
	var newdiv = document.createElement("div");
	newdiv.style.cssText = "width:100px;height:100px;position:absolute;"

	do{
		var rnzm = Math.floor(Math.random()*26)+65
		var zm = String.fromCharCode(rnzm);	  
	}while(data[zm])

	newdiv.style.background = "url(img/"+zm+".png) no-repeat"
	newdiv.style.backgroundSize = "100% 100%";

	do{
		var left = Math.random()*(window.innerWidth-100);
	}while( check(left) )

	var top = Math.random()*-200;

	newdiv.style.top = top+"px";
	newdiv.style.left = left+"px";

	bg.appendChild(newdiv);

	data[zm] = {
		top  : top,
		left : left,
		ele  : newdiv
	}
}

function check(left){
	for(var i in data){
		if (left>data[i].left-100 && left<data[i].left+100) {
			return true;
		}
	}
	return false;
}

function move(){
	for(var i in data){
		data[i].top = data[i].top + speed;
		data[i].ele.style.top = data[i].top + "px";

		if (data[i].top > window.innerHeight) {
			bg.removeChild(data[i].ele);
			delete data[i];
			life--;
			var zhi = life*20 + "%";
			innerlife.innerHTML = life;
			innerlife.style.backgroundSize=zhi+" 100%";
			create();

			if (life == 0) {
				gameover();
			}

		}
	}
}

function diffhandle(){
	startbox.style.display = "none";
	choose.style.display = "block";
}
function chooseBackhandle(){
	startbox.style.display = "block";
	choose.style.display = "none";
}


function startHandle(){
	startbox.style.display = "none";
	show.style.display = "block";
	daojishi.style.display = "block";
	djs_img.src="img/123.gif";

	setTimeout( function(){

		for(var i = 0;i < count;i++){
			create();
		}
		t = setInterval(move,60);
		document.onkeydown = keyDownHander;
		daojishi.style.display = "none";
		djs_img.src = "";

	} ,3000)

	
}

function keyDownHander(e){
	var zm_bm = e.keyCode;
	var zm = String.fromCharCode(zm_bm);

	if (data[zm]) {
		bg.removeChild(data[zm].ele);
		delete data[zm];
		score++;
		innerscore.innerHTML = score;
		create();
		if (score % 10 == 0) {
			speed = speed + 5;
		}
	}
}

function gameover(){

	clearInterval(t);
	document.onkeydown = null;

	overZhezhao.style.display = "block";
	overscore.innerHTML = score;

	if (score < best_defen) {
		bestscore.innerHTML = best_defen;
	}else{
		localStorage.score = score;
		bestscore.innerHTML = score;
		best_defen = score;
	}
}

function resetHandle(){
	init();
	overZhezhao.style.display = "none";
	pauseZhezhao.style.display = "none";
	startHandle();
}
function quitHandle(){
	init();
	overZhezhao.style.display = "none";
	pauseZhezhao.style.display = "none";
	show.style.display = "none";
	clearInterval(t);
	document.onkeydown = null;
	startbox.style.display = "block";
}

function stopHandle(){
	clearInterval(t);
	document.onkeydown = null;
	pauseZhezhao.style.display = "block";
}
function continueBtnHandle(){
	pauseZhezhao.style.display = "none";
	document.onkeydown = keyDownHander;
	t = setInterval(move,60)
}

// function chooseBtnHandle(){
// 	for(var i = 0; i < chooseBtn.length; i++){
// 		chooseBtn[i].style.boxShadow = "none";
// 	}
// 	this.style.boxShadow = "0 0 30px #58360D"
// 	if (this.className == "easy") {
// 		count = 1;
// 	}else if(this.className == "medium"){
// 		count = 3;
// 	}else{
// 		count = 5;
// 	}
// }

function easyHandle(){
	easy.style.boxShadow = "0 0 30px #58360D";
	medium.style.boxShadow = "none";
	hard.style.boxShadow = "none";
	count = 1;
}
function mediumHandle(){
	easy.style.boxShadow = "none";
	medium.style.boxShadow = "0 0 30px #58360D";
	hard.style.boxShadow = "none";
	count = 3;
}
function hardHandle(){
	easy.style.boxShadow = "none";
	medium.style.boxShadow = "none";
	hard.style.boxShadow = "0 0 30px #58360D";
	count = 5;
}

var flag = true;

function musicHandle(){
	if (flag) {
		music.style.animationPlayState = "paused";
		audio.pause();
		flag = false;
	}else{
		music.style.animationPlayState = "running";
		audio.play();
		flag = true;
	}
}



diff.onclick = diffhandle;
chooseBack.onclick = chooseBackhandle;
start.onclick = startHandle;
overReset.onclick = resetHandle;
overQuit.onclick = quitHandle;
stop.onclick = stopHandle;
continueBtn.onclick = continueBtnHandle;
stopReset.onclick = resetHandle;
stopQuit.onclick = quitHandle;


// for(var i = 0; i < chooseBtn.length; i++){
// 	chooseBtn[i].onclick = chooseBtnHandle;
// }
easy.onclick = easyHandle;
medium.onclick = mediumHandle;
hard.onclick = hardHandle;

music.onclick = musicHandle;
