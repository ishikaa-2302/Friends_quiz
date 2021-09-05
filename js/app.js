

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox= document.querySelector(".home-box");
const quizBox= document.querySelector(".quiz-box");
const resultBox= document.querySelector(".result-box");
const questionLimit= 15;

let questionCounter = 0;
let currentQuestion;
let availableQuestions =[];
let availableOptions =[];
let correctAnswers =0;
let attempt =0;

//push questions --> availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i]);
    }
}

//set question number, questions and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question "+(questionCounter + 1) + " of "+questionLimit;

    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML=currentQuestion.q;
    //get position of questionIndex from available question array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the questionIndex from available question array, so questions don't repeat
    availableQuestions.splice(index1,1);

    //show question img if 'img' property exists
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }


    //set options 
    //get the length of options
    const optionLen = currentQuestion.options.length //check till here
    //push options into availableOptions array
    for(let i=0;i<optionLen;i++){ //all good from here
        availableOptions.push(i);
    }
    optionContainer.innerHTML='';
    let animationDelay =0.15;
    //create options in Html
    for(let i=0;i<optionLen;i++){ 
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of optionIndex from the avalableoptions 
        const index2 = availableOptions.indexOf(optionIndex);
        //remove optionIndex from the avalableoptions so option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay=animationDelay + 's';
        animationDelay = animationDelay+0.15;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)")
    }

    questionCounter++
}

//get result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //get ans by comparing the id of clciked option
    if(id===currentQuestion.answer){
        //set green color to correct option
        element.classList.add("correct");
        //add indicator to correct mark
        updateAnswerIndicator("correct")
        correctAnswers++;
    }
    else{
        //set red color to incorrect option
        element.classList.add("wrong");
        //add indicator to incorrect mark
        updateAnswerIndicator("wrong")
        //if ans is incorrect, show the right answer
        const optionLen= optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)==currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }

    }
    attempt++;
    unclickableOptions();
}

//make all options unclickabale one option is selected
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion=questionLimit;
    for(let i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}


function updateAnswerIndicator(mark){
    answersIndicatorContainer.children[questionCounter-1].classList.add(mark)
}


function next(){
    if(questionCounter===questionLimit){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quizbox
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML= questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswers;
    const percentage=(correctAnswers/questionLimit)*100;
    resultBox.querySelector(".percentage").innerHTML=percentage.toFixed(2)+" %";
    resultBox.querySelector(".total-score").innerHTML=correctAnswers+" / "+questionLimit;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers =0;
    attempt =0;
    availableQuestions=[];

}

function tryAgainQuiz(){
    //hide result box
    resultBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

//### Starting point ###

function startQuiz(){
    //hide homebox
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    //first set all questions in avai;ableQuestions array
    setAvailableQuestions();
    //then, call below function
    getNewQuestion();
    //to create indicator of answers
    answersIndicator();
} 

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML=questionLimit;
}