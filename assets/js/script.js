// Questions for quiz
let currentQuestionIndex = 0;
let questions = [
    { 
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Machine Learning",
            "Hyper Transfer Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which HTML tag is used for creating a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<hlink>",
            "<url>"
        ],
        correctAnswer: 1
    },
    {
        question: "How can you apply an external stylesheet to your HTML document?",
        options: [
            "<style> tag",
            "<link> tag",
            "<css> tag",
            "<script> tag"
        ],
        correctAnswer: 1
    },
    {
        question: "What does the CSS selector #myElement target?",
        options: [
            "Class",
            "ID",
            "Tag",
            "Attribute"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "var myVar;",
            "variable myVar;",
            "v myVar;",
            "let myVar;"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a valid JavaScript data type?",
        options: [
            "Character",
            "Float",
            "Double",
            "String"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the correct structure for an HTML document?",
        options: [
            "<head> <body>",
            "<title> <body> <head>",
            "<html> <head> <body>",
            "<body> <html> <head>"
        ],
        correctAnswer: 2
    },
    {
        question: "Which property is used to control the spacing around an element's content inside its box?",
        options: [
            "margin",
            "padding",
            "border",
            "spacing"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you call a function named myFunction in JavaScript?",
        options: [
            "call myFunction()",
            "invoke myFunction()",
            "myFunction()",
            "run myFunction()"
        ],
        correctAnswer: 2
    },

    {
        question: "Which CSS property is used to make an element stay at the top of the page even when the user scrolls?",
        options: [
            "fixed",
            "static",
            "relative",
            "absolute"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the result of the expression 10 + '5' in JavaScript?",
        options: [
            "15",
            "'105'",
            "105",
            "Error"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you specify the source (URL) of an image in HTML?",
        options: [
            "<img href='image.jpg'>",
            "<img src='image.jpg'>",
            "<image>image.jpg</image>",
            "<source>image.jpg</source>"
        ],
        correctAnswer: 1
    },
  
    {
        question: "Which loop in JavaScript is used for iterating over the properties of an object?",
        options: [
            "for loop",
            "while loop",
            "do-while loop",
            "for...in loop"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the purpose of the <header> element in HTML?",
        options: [
            "Define a section of navigation links",
            "Represent a section that contains metadata about the document",
            "Define a header for a document or section",
            "Create a horizontal rule"
        ],
        correctAnswer: 2
    },

    {
        question: "How do you access the third element in an array named myArray?",
        options: [
            "myArray[2]",
            "myArray[3]",
            "myArray.third()",
            "myArray.index(3)"
        ],
        correctAnswer: 0
    },
  
];

// Create timer variable 
var timer = document.getElementById("timer")

// Add event listener to start quiz when button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);

// varaibles for timer and quiz
let timeLeft = 0;
let timerID;
const maxQuestions = 10;

// Code to start timer
function startTimer() {

    // Start the timer to update every second
    timerID = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        // Check if the timer has reached 0
        if (timeLeft <= 0) {
            clearInterval(timerID);
            displayForm();
        }
    }, 1000);
}

// Code to start quiz
function startQuiz() {

    document.getElementById("check-answer").style.display = "none";
    // Reset the question index to start the quiz over
    currentQuestionIndex = 0;
    // Set the initial time
    timeLeft = 75;
    // Hide the start button
    document.getElementById("start").style.display = "none";

    // Show the quiz container
    document.getElementById("quiz-container").style.display = "block";

    // Randomize questions
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(questions);
    
    // Start timer when start quiz function is called
    startTimer();
    // Display the first question
    displayQuestion();
}

// Code to display quiz questions 
function displayQuestion() {

    // Variables for function
    let currentQuestion = questions[currentQuestionIndex];
    let optionsDiv = document.getElementById("quiz-container").querySelector("div");
    let buttons = optionsDiv.getElementsByTagName("button");
    
    // Display question
    document.getElementById("question").textContent = currentQuestion.question;

    // Display answer options with numbers
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = `${i + 1}. ${currentQuestion.options[i]}`;
    }

    // Add event listener
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleAnswer);
    }

    // Make the max questions per quiz to be 10
    if (currentQuestionIndex >= maxQuestions) {
        clearInterval(timerID);
        displayForm();
    }
}

// Code to handle answer chosen by user
function handleAnswer(event) {

    if (timeLeft <= 0) {
        displayForm();
    }

    // Variables for function
    let selectedIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    let currentQuestion = questions[currentQuestionIndex];
    let checkAnswerElement = document.getElementById("check-answer");

    // Code to make answer chosen to act accordingly to it being correct/inccorect
    if (selectedIndex === currentQuestion.correctAnswer) {
        checkAnswerElement.textContent = "Correct!";
    } else {
        checkAnswerElement.textContent = "Incorrect!";
        if (timeLeft >= 10){
            timeLeft -= 10;
        }  else {
            clearInterval(timerID);
            timer.innerText = "Time: 0"
            displayForm();
        }   
    }

    // Show the correct/wrong message
    document.getElementById("check-answer").style.display = "block";

    // Move to the next question immediately
    nextQuestion();
}

// Code to make another question appear after the previous 
function nextQuestion() {

    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayForm();
    }
}

// Code to display form
function displayForm() {
    // Stop timer in order to use that for the score
    clearInterval(timerID);
    document.getElementById("timer").textContent = "Time: " + timeLeft;
    // Ensure correct ID's are appearing on screen
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById("form-container").style.display = "block";
    // Show final score sentence to user
    document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
}

// Add event listener
document.getElementById("submit-btn").addEventListener("click", submitScore);


// var scoreCounter = 1;

// Load high scores from local storage when the page loads
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Code for submit button in the form section
function submitScore() {

    // Get the initials entered by the user
    var initials = document.getElementById("initial-container").value;

    // Get the user's score from the time left on timer
    var score = timeLeft;
   
    // Create an object to store the initials and score
    var newScore = {
        initials: initials,
        score: score
    };

    // Add the new score to the highScores array
    highScores.push(newScore);

    // Sort high scores in descending order
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Save high scores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    showScores();
}

// Code to show high scores page
function showScores() {
    event.preventDefault();

    // prevent any other container from appearing that is not the score section 
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById("score-container").style.display = "block";
    document.getElementById('header').style.display = 'none';

    // Code to display scores
    var highscoreElement = document.getElementById("highscore");
    highscoreElement.innerHTML = '';

    highScores.forEach(function (entry, index) {
        var newScoreElement = document.createElement("p");
        newScoreElement.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
        highscoreElement.appendChild(newScoreElement);
    });
}

// Link view high scores button to view high scores page
var viewContainer = document.getElementById("view-scores");
viewContainer.addEventListener("click", showScores);

// Make go back button functional, takes user back to main page
var goBack = document.getElementById("goback");

goBack.addEventListener("click", function () {

    clearInterval(timerID);
    timer.innerText = "Time: 0";
    window.location.reload();
});

// Makes clear high scores button clear out all the current saved scores in the high score page
var clearScores = document.getElementById("clear");
clearScores.addEventListener("click", function () {
    // Clear high scores from local storage and refresh the high scores display
    localStorage.removeItem("highScores");
    document.getElementById("highscore").innerHTML = "";
});
