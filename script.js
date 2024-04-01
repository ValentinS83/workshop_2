class Quiz {
    constructor(questions){
        this.questions = questions;
        this.questionContainer = document.getElementById('question');
        this.answerButton = document.getElementById('answer-buttons');
        this.feedback = document.getElementById('feedback');
        this.nextButton = document.getElementById('next-button');
        console.log(this.questions[0]);
        this.showQuestion(this.questions[0]);

    }

    showQuestion(question) {
        this.questionContainer.textContent = question.question;
        this.answerButton.innerHTML = '';
        for (const answer of question.answers) {
            //const answearElement = `<li><button class="btn"></button></li>`;
            const buttonContainer = document.createElement('li');
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('btn');
            buttonElement.textContent = answer.text;
            this.answerButton.appendChild(buttonContainer);
            buttonContainer.appendChild(buttonElement);
            
        }
    }
}
// async folosim pe functia parinte
async function initQuiz() {
    // aducem datele din questions.json
    const fileContent = await fetch('./questions.json');
    // cu await afisam datale din questions.json
    const quizQuestions = await fileContent.json();
    console.log(quizQuestions);
    const quiz = new Quiz(quizQuestions);
}

initQuiz();

