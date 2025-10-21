let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);
let answerBtn = document.querySelector("#js-tweet").addEventListener('click', displayAnswer);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion"

var currentQuestion = ""
var currentAnswer = ""

async function newTrivia() {
    currentAnswer = "";
    displayAnswer();

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        currentQuestion = json["question"];
        currentAnswer = json["answer"];
        displayTrivia(currentQuestion);
    } catch (err) {
        console.log(err);
        alert("Somehow you've minced it");
    }
}

function displayTrivia(question) {
    const questionText = document.querySelector("#js-quote-text");
    questionText.textContent = question;
}

function displayAnswer() {
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = currentAnswer;
}

newTrivia()