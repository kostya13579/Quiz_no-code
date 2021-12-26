const option1 = document.querySelector(".option1"),
    option2 = document.querySelector(".option2"),
    option3 = document.querySelector(".option3"),
    option4 = document.querySelector(".option4");

const optionElements = document.querySelectorAll(".option");
const question = document.getElementById("question");
const numberOfQuestion = document.getElementById("number-of-question"),
    numberOfAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion = 0,
    indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");
let score = 0;
const correctAnswer = document.getElementById("correct-answer"),
    numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"),
    btnTryAgain = document.getElementById("btn-try-again");

const questions = [{
        question: "Who really has very good soft skills?",
        options: [
            "Everybody",
            "Nobody",
            "Kostyantyn Skaklinyov",
            "Somebody",
        ],
        rightAnswer: 2,
    },
    {
        question: "Who studies QA, programming and English every day?",
        options: ["Dogs", "Kostyantyn Skaklinyov", "Cats", "Unicorns"],
        rightAnswer: 1,
    },
    {
        question: "Who is the most motivated to work for the best results?",
        options: ["...don't know", "...difficult to say", "...anybody", "Kostyantyn Skaklinyov"],
        rightAnswer: 3,
    },
];
numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);

    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach((item) => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.lenth == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    } else {
        el.target.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions();
};
for (option of optionElements) {
    option.addEventListener("click", (e) => checkAnswer(e));
}
const disabledOptions = () => {
    optionElements.forEach((item) => {
        item.classList.add("disabled");
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add("correct");
        }
    });
};

let enableOptions = () => {
    optionElements.forEach((item) => {
        item.classList.remove("disabled", "correct", "wrong");
    });
};
const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement("div");
        answersTracker.appendChild(div);
    });
};
const updateAnswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if (!optionElements[0].classList.contains("disabled")) {
        alert("Вам нужно выбрать хоть один из вариантов ответа");
    } else {
        randomQuestion();
        enableOptions();
    }
};
const quizOver = () => {
    document.querySelector(".quiz-over-modal").classList.add("active");
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};
const tryAgain = () => {
    window.location.reload();
};
btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
    validate();
});

window.addEventListener("load", () => {
    load();
    randomQuestion();
    answerTracker();
});

document.getElementById("main-button").onclick = function() {
    document.getElementById("outline").style.display = 'none';
};
