
{
var timerInterval = null;
var totalmSecond = 0;
var mSecond = 0;
var second = 0;
var minute = 0;
var moves = ['R\'','L\'','U\'','D\'','F\'','B\'','R','L','U','D','F','B'];
var totalSolves = 0;
var avgThree = 0;
var avgFive = 0;
var avgTen = 0;
var times = [];

function start () {
  
  //If the time is less than 10 milliseconds, it will use 10 milliseconds...this changes up the math....
  timerInterval = setInterval(changeValue, 10);  
}

function changeValue() {

	totalmSecond += 10;
	
	document.getElementById("time").innerHTML = formatTime(totalmSecond);
  	

}

function formatTime(totalmSecond){
  minute = Math.floor(totalmSecond/60000.0);
  second = Math.floor((totalmSecond - (minute*60000))/1000.0);
  mSecond = totalmSecond-(second*1000) - (minute*60000);

  tempString = (minute == 0?"":minute + ":") + (second == 0?"":second + ":") + (mSecond == 0?"":mSecond);
  return tempString;

}


var stop = function () {

	generateScramble(); 
  times.push(totalmSecond);
  clearInterval(timerInterval);
  totalmSecond =0;
  mSecond = 0;
  second = 0;
  minute =0;
  totalSolves++;
  var tempTotal = 0;
  if(times.length >= 3){
   
    for(i = times.length - 1;i > times.length - 4;i--){
        tempTotal += times[i];
    }
    tempTotal /= 3.0;
    document.getElementById("avg3").innerHTML = "Avg 3: " + formatTime(Math.round(tempTotal));
  }
  if(times.length >= 5){
    tempTotal = 0;
     for(i = times.length - 1;i > times.length - 6;i--){
        tempTotal += times[i];
    }
    tempTotal /= 5.0;
    document.getElementById("avg5").innerHTML = "Avg 5: " + formatTime(Math.round(tempTotal));
  }
  if(times.length >= 10){
    tempTotal = 0;
     for(i = times.length - 1;i > times.length - 11;i--){
        tempTotal += times[i];
    }
    tempTotal /= 10.0;
    document.getElementById("avg10").innerHTML = "Avg 10: " + formatTime(Math.round(tempTotal));

  }
  

}


var isRunning = false;
document.onkeydown = function (e) {
    if (e.keyCode == 32) {
    	
    	if(isRunning){
        stop();
  		  isRunning = false;
        
    	}else{
        start();
    		isRunning = true;
    		

    	}
    	
    	
    }
}

function generateScramble(){
  var myString = ""; 
  for(i = 0;i < 20;i++){

    myString += moves[Math.round(Math.random()*10)+(Math.random()<0.5?1:0)] + ' ';

  }
  document.getElementById("scramble").innerHTML = myString;
}

document.addEventListener('DOMContentLoaded', function() {
    generateScramble();

    var link = document.getElementById('execute');
    // onClick's logic below:
    link.addEventListener('click', function() {
        chrome.tabs.create({url: "main.html"});
    });
});
  



}