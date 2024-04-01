class Quiz {
    constructor(questions){
        this.questions = questions;
        this.questionContainer = document.getElementById('question');
        this.answerButton = document.getElementById('answer-buttons');
        this.feedback = document.getElementById('feedback');
        this.nextButton = document.getElementById('next-button');
        this.currentQuestionIndex = [0];
        this.showQuestion(this.questions[this.currentQuestionIndex]);
        this.nextButton.addEventListener('click', () => this.nextQuestion());

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
            buttonElement.addEventListener('click', () => this.selectAnswers(answer, question, buttonElement));
        }
    }

    selectAnswers(answer, question, button) {
        const correct = answer.correct;
        if(correct) {
            this.nextButton.classList.remove('hide');
            this.feedback.textContent = question.explanation;
            button.classList.add('correct');
            this.feedback.classList.remove('text-wrong');
            this.feedback.classList.add('text-correct');
        } else {
            button.classList.add('wrong');
            this.feedback.textContent = 'Raspuns incorect. Te rog sa incerci din nou';
            this.feedback.classList.add('text-wrong'); 
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.resetQuestion();
        if(this.currentQuestionIndex >= this.questions.length) {
            console.log('Sfarsit Quiz');
        } else {
            this.showQuestion(this.questions[this.currentQuestionIndex]);
        }
    }

    resetQuestion() {
        this.feedback.classList.remove('text-correct', 'text-wrong');
        this.feedback.innerHTML = '';
        this.nextButton.classList.add('hide');
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

