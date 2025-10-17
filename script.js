const question = [
    {
        question: "Quando nasceu Francisco de Goya?",
        answers: [
            { id: 1, text: "28 de abril de 1770", correct:false},
            { id: 2, text: "16 de agosto de 1750", correct:false},
            { id: 3, text: "30 de março de 1746", correct:true},
            { id: 4, text: "14 de setembro de 1766", correct:false},
        ]
    },
     {
        question: "Qual é o nome da técnica utilizada por Goya?",
        answers: [
            { id: 1, text: "Pinturas Vintage", correct:false},
            { id: 2, text: "Pinturas Negras", correct:true},
            { id: 3, text: "Virgulismo", correct:false},
            { id: 4, text: "Pontilismo", correct:false},
        ]
    },
     {
        question: "De quando a quando Salvador Dalí viveu?",
        answers: [
            { id: 1, text: "1904-1989", correct:true},
            { id: 2, text: "1907-1980", correct:false},
            { id: 3, text: "1804-1889", correct:false},
            { id: 4, text: "1904-1990", correct:false},
        ]
    },
     {
        question: "As suas duas obras mencionadas levavam as teorias de quem em consideração?",
        answers: [
            { id: 1, text: "James Gunn", correct:false},
            { id: 2, text: "George Lucas", correct:false},
            { id: 3, text: "Albert Einstein", correct:false},
            { id: 4, text: "Sigmund Freud", correct:true},
        ]
    },
     {
        question: "Qual foi a principal influência da vida de Miguel de Cervantes que o inspirou a criar “Dom Quixote”?",
        answers: [
            { id: 1, text: "Pela sua imaginção e vontade de recriar uma história pensada desde a infância", correct:false},
            { id: 2, text: "Pela vida dura. Foi soldado, preso, passou por pobreza e desilusões", correct:true},
            { id: 3, text: "Pela vida fácil e mordomia em sua empresa com suas inestimadas riquezas", correct:false},
            { id: 4, text: "Pela curiosidade e espertesa de sua parte para o mundo da literatura", correct:false},
        ]
    },
     {
        question: "Por que Dom Quixote confunde moinhos de vento com gigantes?",
        answers: [
            { id: 1, text: "Os confunde por estar cansado e exausto", correct:false},
            { id: 2, text: "Dom Quixote os confunde por estar desorientado", correct:false},
            { id: 3, text: "Pela arquitetura da época ser fantasiosa e mágica", correct:false},
            { id: 4, text: "Dom Quixote confunde pois está tomado pela fantasia", correct:true},
        ]
    },
]

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex - 0;
    score = 0;
    nextButton.innerHTML = "Próxima"
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function showQuestion() {
    resetState()
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answersButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    answer = question[currentQuestionIndex].answers;
    const correctAnswer = answer.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersButtons.children).forEach((button) => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${question.length}!`;
    nextButton.innerHTML = "Jogue de novo";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();