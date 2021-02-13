//TODO: FIX THAT IT GOES BACK TO MAIN SCREEN WHEN DONE
const MAX_PROBLEMS = 100
//TIMER CODE
document.getElementById('timer').innerText = "05:00";
var interval;
function startTimer(duration, display) {
    var timer = duration;
    var minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert('timer completed');
            clearInterval(interval);
        }
        
    }, 1000);
}
function callTimer(){
    var duration = 60*5;
    var display = document.querySelector('#timer');
    startTimer(duration, display);
}


//helper function to update seconds display properly
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
//-------------------------------------------------------------------------------------

//IDENTIFY SELECTED TOPIC
//add event listener to each topic's button
const topics = document.querySelectorAll('.topic-box');
topics.forEach(topic => {
    const symbol = topic.classList[1]; //grab topic from class given to buttons
    topic.addEventListener('click', function(){
        topicClicked(symbol);
        document.getElementById('information-container').style.display = "flex";
    } );
})

var problems = [];
var probCount = 0; //counting which problem we are on, from 0-99, to access it in the array
//loads the appropriate set of problems based on which button was pressed
function topicClicked(topic){
    document.getElementById('topics-container').style.display = "none";
    document.getElementById('title').style.display = "none";
    document.getElementById('switch-topic-button').style.display = "flex";
    document.getElementById('problem-box').style.display = "flex";
    var sym;
    switch(topic){
        case "addition":
            sym = "+";
            loadAddition();
            numberUpdater(sym);
            break;
        case "subtraction":
            sym = "-";
            loadSubtraction();
            numberUpdater(sym);
            break;
        case "multiplication":
            sym = "&times";
            loadMultiplication();
            numberUpdater(sym);
            break;
        case "division":
            sym = "&divide";
            loadDivision();
            numberUpdater(sym);
            break;
    }
    
}



//-------------------------------------------------------------------------------------

//CREATING PROBLEM SETS
//There will be 100 generated questions for whichever topic is chosen
//-------------------------------------------------------------------------------------

function loadAddition(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 31);                  //first number between 0-30
        num2 = Math.floor(Math.random() * 31);                  //second number between 0-30
        ans = num1+num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
    
    console.log(problems);
}

function loadSubtraction(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 16) + 5;              //first number must be between 5-20
        num2 = Math.floor(Math.random() * (num1-1)) + 1;        //second number must be less than first
        ans = num1-num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
    console.log(problems);
}

function loadMultiplication(){
    var num1;
    var num2;
    var ans;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        num1 = Math.floor(Math.random() * 13);                  //first number between 0-12
        num2 = Math.floor(Math.random() * 13);                  //second number between 0-12
        ans = num1*num2;
        problems.push({num1: num1, num2: num2, ans: ans});  
    }
    console.log(problems);
}



function loadDivision(){
    var factor1;
    var factor2;
    var product;
    problems = [];
    for(var i=0; i<MAX_PROBLEMS; i++){
        factor1 = Math.floor(Math.random() * 13);                  //multiply two numbers first to ensure generated factors are divisible 
        factor2 = Math.floor(Math.random() * 12) + 1;              //plus one to exclude 0 as a possibility
        product = factor1 * factor2;
        problems.push({num1: product, num2: factor1, ans: factor2});  
    }
    console.log(problems)
}

//-------------------------------------------------------------------------------------

//SUBMITTING ANSWER
//pressing Enter while the input field is in focus will submit the form and call this function
function verifyAnswer(){
    //allow form to submit information and clear field without refreshing the page
    const ans = document.getElementsByClassName('answer-box')[0].value;
    if(ans == problems[probCount].ans){
        document.getElementById('answer-form').reset();
        return true;
    } else{ 
        document.getElementById('answer-form').reset();
        return false;
    }
    
}
function numberUpdater(sym){
    document.getElementsByClassName('top-number')[0].innerText = problems[probCount].num1;
    document.getElementsByClassName('symbol')[0].innerHTML = sym;
    document.getElementsByClassName('bottom-number')[0].innerText = problems[probCount].num2;  
}

function mainDriver(){
    
    var sym = document.getElementsByClassName('symbol')[0].innerHTML;
    if(verifyAnswer()){
        probCount+=1;
        if(probCount>=MAX_PROBLEMS){
            alert("All problems completed!")
        }
        else{
            document.getElementById('problem-count').innerText = `${(probCount+1)}/${MAX_PROBLEMS}`;
            numberUpdater(sym);
        }
    }
    else{
        alert("wrong!");
    }
    
}

//FUNCTION TO BRING BACK TOPICS
function switchTopic(){
    document.getElementById('switch-topic-button').style.display = "none";
    document.getElementById('topics-container').style.display = "flex";
    document.getElementById('title').style.display = "flex";
    document.getElementById('information-container').style.display = "none";
    clearInterval(interval);
    document.getElementById('timer').innerText = "05:00";
    document.getElementById('problem-count').innerText = "1/100";
    probCount = 0;
}

//set problem counter
function initializeProbCount(){
    document.getElementById('problem-count').innerText = `1/${MAX_PROBLEMS}`
}

initializeProbCount()