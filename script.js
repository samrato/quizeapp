import data from './data.json' assert { type: 'json' };

const noOfQuestion = data.length;
const eachQuestion = document.getElementById("question");
const qa = document.getElementById("qa");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("next-btn");


let currentIndex = -1;
let score = 0;

function startQuize(){
    nextButton.addEventListener("click",showeachQuestions );
}

function showeachQuestions(){
    resetState();
    nextButton.innerHTML = "Next";
    qa.style.display = "block";
    let currentQues = data[currentIndex];
    eachQuestion.innerHTML = (currentIndex+1)+". "+ currentQues.question;
    for(let i=0;i<4;i++){
        const button = document.createElement("button");
        let optionNumber = String.fromCharCode(65+i);
        button.innerHTML = data[currentIndex][optionNumber];
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    }
}

function resetState(){
    while(answerButtons.firstChild){
        nextButton.style.display="none";
        answerButtons.removeChild(answerButtons.firstChild);
        console.log("Reset State called");
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correctOption = data[currentIndex].answer;
    const correctAnswer = data[currentIndex][correctOption];
    if(correctAnswer===selectButton.textContent){
        selectButton.classList.add("correct");
        score++;
    }
    else{
        selectButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.textContent===correctAnswer){
            button.classList.add("correct");
        }
        button.disabled=true;
    });

    nextButton.style.display = "block";
}

function handleNextButton(){
    currentIndex++;
    (currentIndex<data.length)?showeachQuestions():showScore();
}

function showScore(){
    resetState(); //delete previous question
    nextButton.style.display = "block";
    nextButton.innerHTML = "Play Again";
    eachQuestion.innerHTML= ``;
    var scoreContainer = document.createElement('div');
    eachQuestion.appendChild(scoreContainer);
    scoreContainer.classList.add("score");
    scoreContainer.innerHTML= `<h1>Your Score : ${score} </h1>`;
    if((score/noOfQuestion)<0.4)
        scoreContainer.style.color = "red";
    else
        scoreContainer.style.color = "green";

}

//Starting from when we click on Play Now Button
nextButton.addEventListener("click", ()=>{
    //go to next question
    if(currentIndex<data.length)
        handleNextButton();
    else
    {
        //if all questions done
        currentIndex = 0;
        score = 0;
        showeachQuestions();
    };
});
