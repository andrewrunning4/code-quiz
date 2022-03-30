// question arrays
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _____",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "2. other arrays"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
    
    
];

// grab references to elements
var mainpg = document.getElementById("mainpg");
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var results = document.getElementById("score-box");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define other global variables we need 
var correctAns = 0;
var questionNum = 0;
var questionIndex = 0;
var scoreResult;

// event listeners for click events
startQuizBtn.addEventListener("click", newQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

// clear local storage and reload page after clear scores button is clicked
clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "Scores Cleared!";
    window.setInterval('refresh()');
    function refresh() {
        window.location.reload();
    }
    refresh();
});

// start timer display hidden elements and hide what we dont want here
var totalTime = 150;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    questionDiv.style.display = "block";
    timer.style.display = "block";
    startDiv.style.display = "none";
    timesUp.style.display = "none";
    
    
// if time runs out, you lose the game
    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);
// call function to start over again
    showQuiz();
};

// then presented with questions and choices
function showQuiz() {
    // call next question function
    nextQuestion();
}
// choose a question and display choices associated with it
function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choice1.textContent = questions[questionIndex].choices[0];
    choice2.textContent = questions[questionIndex].choices[1];
    choice3.textContent = questions[questionIndex].choices[2];
    choice4.textContent = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    // if the answer you chose matches the associated correct answer
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // increment score and display correct
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 15 seconds from timer display wrong 
        totalTime -= 15;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong!";
    }
    // increment index to move to another question
    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // call game over function
        gameOver();
    }
}

// nested functions to run through each possible answer chosen from event listener
function choose1() { checkAnswer(0); }

function choose2() { checkAnswer(1); }

function choose3() { checkAnswer(2); }

function choose4() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    results.style.display = "block";
    timesUp.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    finalScore.textContent = correctAns;
    
}

// enter initial and store in local storage
function storeHighScores(event) {
    // prevent default for form 
    event.preventDefault();

    // validate user input
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 
    // hide/display boxes 
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    results.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    // check if any stored scores. parse if there is
    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    // display initials and score
    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };
    // console.log to grab scores
    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array for local storage
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // call highscores function
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {
    // hide/display elements that are needed
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    results.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    // console.log to grab high score values
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);
    // for loop to create p elements that will display scores that have been stored
    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}
