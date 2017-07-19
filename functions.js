
{
var timerInterval = null;
var totalmSecond = 0;
var mSecond = 0;
var second = 0;
var minute = 0;
var hour = 0;
var moves = ['R\'','L\'','U\'','D\'','F\'','B\'','R','L','U','D','F','B'];
function start () {
  stop();
  //If the time is less than 10 milliseconds, it will use 10 milliseconds...this changes up the math....
  timerInterval = setInterval(changeValue, 10);  
}

function changeValue() {

	totalmSecond += 10;
	minute = Math.floor(totalmSecond/60000.0);
	second = Math.floor((totalmSecond - (minute*60000))/1000.0);
	mSecond = totalmSecond-(second*1000) - (minute*60000);

	tempString = (minute == 0?"":minute + ":") + (second == 0?"":second + ":") + (mSecond == 0?"":mSecond);
	document.getElementById("time").innerHTML = tempString;
  	

}

var stop = function () {
	generateScramble(); 
  clearInterval(timerInterval);
  totalmSecond =0;
  mSecond = 0;
  second = 0;
  minute =0;
  hour = 0;
}


var isRunning = false;
document.onkeydown = function (e) {
    if (e.keyCode == 32) {
    	
    	if(isRunning){
  		isRunning = false;
        start();

    	}else{
    		isRunning = true;
    		stop();

    	}
    	
    	
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('execute');
    // onClick's logic below:
    link.addEventListener('click', function() {
        chrome.tabs.create({url: "main.html"});
    });
});
  

function generateScramble(){
	var myString = ""; 
	for(i = 0;i < 20;i++){

		myString += moves[Math.round(Math.random()*10)+(Math.random()<0.5?1:0)] + ' ';

	}
	document.getElementById("scramble").innerHTML = myString;
}


}