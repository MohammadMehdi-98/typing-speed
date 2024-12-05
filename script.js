const TheTimer=document.querySelector(".timer");
const testArea=document.querySelector("#test-area");
const originText=document.querySelector("#origin-text p").innerHTML;
const testWrapper=document.querySelector(".test-wrapper");
const BTN=document.querySelector("#reset");

var Timer=[0,0];
var centiseconds=0;
var TimerRunning=false;
var interval;

function runTimer(){
    let currentTime= (Timer[0]<=9 ? "0" : "")+Timer[0]+":"+(Timer[1]<=9 ? "0" : "")+Timer[1]+":"+(centiseconds<=9 ? "0" : "")+centiseconds;
    TheTimer.innerHTML=currentTime;
    centiseconds++;
    if(centiseconds>=100){
        centiseconds=0;
        Timer[1]++;
    }
    if(Timer[1]>=60){
        Timer[1]=0;
        Timer[0]++;
    }
}

function SpellCheck(){
    let textEntered=testArea.value;
    let originTextMatch=originText.substring(0,textEntered.length);
    if(textEntered==originText){
        testWrapper.style.borderColor="green";
        clearInterval(interval);
        
    }else{
        if(textEntered==originTextMatch){
            testWrapper.style.borderColor="yellow";
        }else{
            testWrapper.style.borderColor="red";
        }
    }
}



function start(){
    let TextEnteredLength=testArea.value.length;

    if(TextEnteredLength==0 && !TimerRunning){
        interval=setInterval(runTimer,10);
        TimerRunning=true;
    }

}

function ResetButton(){
    clearInterval(interval)
    interval=null;
    Timer=[0,0];
    centiseconds=0;
    TimerRunning=false;
    testArea.value="";
    TheTimer.innerHTML="00:00:00";
    testWrapper.style.borderColor="grey";

}

testArea.addEventListener("keypress",start);
testArea.addEventListener("keyup",SpellCheck);
BTN.addEventListener("click",ResetButton);