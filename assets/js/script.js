const startBut = document.getElementById('click-start');
const nextButton = document.getElementById('click-next');
const questionsCont = document.getElementById('quest-container');
const questEls = document.getElementById('questions');
const answerBtnEl = document.getElementById('answer-btns');
const startText = document.getElementById('start-title');

let shuffled, current

startBut.addEventListener('click', function startGame(e) {
    e.preventDefault();
    startBut.classList.add('hide');
    startText.classList.add('hide');
    questionsCont.classList.remove('hide');
    shuffled = questions.sort(() => Math.random() - .5);
    current = 0;
    nextQuestion();
    nextButton.addEventListener('click', () => {
        current++;
        if (current < shuffled.length) {
          nextQuestion();
        } else {
          alert('Quiz Completed!');
        }
      });
})

function nextQuestion() {
    resetState()
    showQuestion(shuffled[current])
}

function showQuestion(question) {
    questEls.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectOption);
      answerBtnEl.appendChild(button);
    });
  
    nextButton.classList.add('hide');
  }
  

function resetState() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectOption(e) {
    const selectedOption = e.target;
    const correct = selectedOption.dataset.correct;
  
    setStatus(selectedOption, correct);
    Array.from(answerBtnEl.children).forEach(button => {
      if (button.dataset.correct) {
        setStatus(button, true);
      } else {
        setStatus(button, false);
      }
    });
    
    if (correct) {
      alert('Correct!');
    } else {
      alert('Wrong!');
    }

    nextButton.classList.remove('hide');
    nextButton.addEventListener('click', () => {
        current++;
        if (current < shuffled.length) {
          nextQuestion();
        } else {
          alert('Quiz Completed!');
        }
      });
  }

function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
        return true;
    } else {
        element.classList.add('wrong')
        return false;
    }
}

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "Which form of CSS did we first learn in the program?",
        answers: [
            {text: 'A: CSS', correct: true},
            {text: 'B: CSS+', correct: false}
        ]
    },
    {
        question: "What does the acronym DRY stand for?",
        answers: [
            {text: "A: Don't. Run. Yourself", correct: false},
            {text: "B: Don't. Repetition. Yourself", correct: false},
            {text: "C: Don't. Repeat. Yourself", correct: true},
            {text: "D: Don't. Run. Yorkshire", correct: false}
        ]
    }
]
