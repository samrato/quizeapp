import data from './data.json' assert { type: 'json' };

const noOfQuestion = data.length;
const eachQuestion = document.getElementById("question");
const qa = document.getElementById("qa");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    nextButton.textContent = "Play";
    nextButton.addEventListener("click", handleNextButton);
}

// Show Each Question
function showEachQuestion() {
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

    // Highlight correct answer and disable all buttons
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
    if (nextButton.textContent === "Play") {
        // Initialize quiz on first click
        nextButton.textContent = "Next";
        showEachQuestion();
    } else if (currentIndex < noOfQuestion - 1) {
        currentIndex++;
        showEachQuestion();
    } else {
        showScore();
    }
}

// Show Score
function showScore() {
    resetState();
    eachQuestion.textContent = "";
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score");
    scoreContainer.innerHTML = `<h1>Your Score: ${score}/${noOfQuestion}</h1>`;

    // Color the score based on performance
    scoreContainer.style.color = (score / noOfQuestion) < 0.4 ? "red" : "green";
    eachQuestion.appendChild(scoreContainer);

    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", resetQuiz);
}

// Reset Quiz
function resetQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.textContent = "Play";
    qa.style.display = "none";
    resetState();
}

// Initialize the Quiz
startQuiz();
