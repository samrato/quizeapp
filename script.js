console.log("Script Loaded"); // Debugging

let data = []; // Placeholder for quiz data
let currentIndex = 0;
let score = 0;

const eachQuestion = document.getElementById("question");
const qa = document.getElementById("qa");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("next-btn");

// Fetch JSON file
fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        data = json; // Load quiz data
        console.log("Quiz Data Loaded", data);
        startQuiz();
    })
    .catch(error => console.error("Failed to load JSON:", error));

// Start Quiz
function startQuiz() {
    console.log("Start Quiz Initialized");
    nextButton.textContent = "Play";
    nextButton.addEventListener("click", handleNextButton);
}

// Show Each Question
function showEachQuestion() {
    console.log("Showing Question:", currentIndex + 1); // Debugging
    resetState();
    qa.style.display = "block";

    const currentQues = data[currentIndex];
    eachQuestion.textContent = `${currentIndex + 1}. ${currentQues.question}`;
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        const optionNumber = String.fromCharCode(65 + i); // 'A', 'B', 'C', 'D'
        button.textContent = currentQues[optionNumber];
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    }

    nextButton.style.display = "none";
}

// Reset State
function resetState() {
    eachQuestion.textContent = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
}

// Select Answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correctOption = data[currentIndex].answer;
    const correctAnswer = data[currentIndex][correctOption];

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Handle Next Button
function handleNextButton() {
    console.log("Next Button Clicked"); // Debugging
    if (nextButton.textContent === "Play") {
        nextButton.textContent = "Next";
        showEachQuestion();
    } else if (currentIndex < data.length - 1) {
        currentIndex++;
        showEachQuestion();
    } else {
        showScore();
    }
}

// Show Score
function showScore() {
    resetState();
    const scoreMessage = `<h1>Your Score: ${score}/${data.length}</h1>`;
    eachQuestion.innerHTML = scoreMessage;

    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", resetQuiz);
}

// Reset Quiz
function resetQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    qa.style.display = "none";
    resetState();
    handleNextButton(); // Start the quiz again
}
