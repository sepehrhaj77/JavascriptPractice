//TIMER CODE
document.getElementById('timer').innerText = "5:30";

function startTimer(){
    var presentTime = document.getElementById('timer').innerText;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1)); //decrement the seconds and update display
    if(s==59){m=m-1}
    if(m<0){
        alert('timer completed');
        return;
    }
    
    document.getElementById('timer').innerText = m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000); //call the function again in one second
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
    startTimer();
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
    for(var i=0; i<100; i++){
        num1 = Math.floor(Math.random() * 21);                  //first number between 0-20
        num2 = Math.floor(Math.random() * 21);                  //second number between 0-20
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
    for(var i=0; i<100; i++){
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
    for(var i=0; i<100; i++){
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
    for(var i=0; i<100; i++){
        factor1 = Math.floor(Math.random() * 13);                  //multiply two numbers first to ensure generated factors are divisible 
        factor2 = Math.floor(Math.random() * 13);                  //(if we generate two random numbers to divide, they might not work out to a whole number)
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
    console.log(sym)
    if(verifyAnswer()){
        probCount+=1;
        document.getElementById('problem-count').innerText = probCount+"/100";
        numberUpdater(sym);
    }
    else{
        alert("wrong!");
    }
    if(probCount>99){
        alert("All problems completed!")
    }
}

//FUNCTION TO BRING BACK TOPICS
function switchTopic(){
    document.getElementById('switch-topic-button').style.display = "none";
    document.getElementById('topics-container').style.display = "flex";
    document.getElementById('title').style.display = "flex";
    document.getElementById('information-container').style.display = "none";
}
