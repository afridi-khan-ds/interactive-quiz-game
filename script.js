const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const resultElement = document.createElement('div');
resultElement.classList.add('hide');
resultElement.style.textAlign = 'center';

const container = document.querySelector('.container');
container.insertBefore(resultElement, document.querySelector('.controls'));

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  if (!answered) return;

  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    showResults();
  }
});

function startGame() {
  score = 0;
  currentQuestionIndex = 0;
  answered = false;

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

  startButton.classList.add('hide');
  nextButton.classList.add('hide');
  resultElement.classList.add('hide');
  questionContainerElement.classList.remove('hide');

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText =
    `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}: ${question.question}`;

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');

    if (answer.correct) {
      button.dataset.correct = 'true';
    }

    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  answered = false;
  clearStatusClass(document.body);
  nextButton.classList.add('hide');

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(event) {
  if (answered) return;

  answered = true;

  const selectedButton = event.currentTarget;
  const correct = selectedButton.dataset.correct === 'true';

  if (correct) {
    score++;
  }

  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
    button.disabled = true;
  });

  nextButton.innerText =
    currentQuestionIndex < shuffledQuestions.length - 1
      ? 'Next'
      : 'See Results';

  nextButton.classList.remove('hide');
}

function showResults() {
  questionContainerElement.classList.add('hide');
  nextButton.classList.add('hide');

  resultElement.innerHTML = '';

  const heading = document.createElement('h2');
  heading.innerText = 'Quiz Completed!';

  const scoreText = document.createElement('p');
  scoreText.innerText =
    `Your Final Score: ${score} / ${shuffledQuestions.length}`;

  const message = document.createElement('p');

  if (score === shuffledQuestions.length) {
    message.innerText = 'Excellent! You got every question right!';
  } else if (score >= shuffledQuestions.length / 2) {
    message.innerText = 'Good job! Keep learning and improving.';
  } else {
    message.innerText = 'Nice try! Play again to improve your score.';
  }

  resultElement.append(heading, scoreText, message);
  resultElement.classList.remove('hide');

  startButton.innerText = 'Play Again';
  startButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}


// ALL 10 HSE SAFETY OFFICER QUIZ QUESTIONS
const questions = [
  {
    question: 'What is the main purpose of a workplace risk assessment?',
    answers: [
      { text: 'To identify hazards and evaluate risks', correct: true },
      { text: 'To increase work speed', correct: false },
      { text: 'To reduce the number of workers', correct: false },
      { text: 'To avoid preparing safety reports', correct: false }
    ]
  },
  {
    question: 'What is the main purpose of a Permit-to-Work (PTW) system?',
    answers: [
      { text: 'To record employee attendance', correct: false },
      { text: 'To authorize and control hazardous work activities', correct: true },
      { text: 'To approve overtime', correct: false },
      { text: 'To replace risk assessments', correct: false }
    ]
  },
  {
    question: 'What is an important requirement when working at height?',
    answers: [
      { text: 'Use any available rope', correct: false },
      { text: 'Work without checking the area', correct: false },
      { text: 'Use an inspected full-body harness with a suitable anchor point when required', correct: true },
      { text: 'Depend only on personal experience', correct: false }
    ]
  },
  {
    question: 'Who should inspect scaffolding before it is used?',
    answers: [
      { text: 'Any available worker', correct: false },
      { text: 'A competent and authorized person', correct: true },
      { text: 'The delivery driver', correct: false },
      { text: 'A visitor to the site', correct: false }
    ]
  },
  {
    question: 'Which control is the most effective in the hierarchy of controls?',
    answers: [
      { text: 'Personal Protective Equipment (PPE)', correct: false },
      { text: 'Administrative controls', correct: false },
      { text: 'Warning signs', correct: false },
      { text: 'Elimination of the hazard', correct: true }
    ]
  },
  {
    question: 'Which fire extinguisher is generally suitable for an energized electrical equipment fire?',
    answers: [
      { text: 'Water extinguisher', correct: false },
      { text: 'Foam extinguisher', correct: false },
      { text: 'CO₂ extinguisher', correct: true },
      { text: 'Water bucket', correct: false }
    ]
  },
  {
    question: 'Why should near misses be reported?',
    answers: [
      { text: 'To identify hazards and prevent future incidents', correct: true },
      { text: 'To blame the workers involved', correct: false },
      { text: 'To increase paperwork only', correct: false },
      { text: 'Because reporting is optional in every workplace', correct: false }
    ]
  },
  {
    question: 'When should a toolbox talk normally be conducted?',
    answers: [
      { text: 'Only after an accident', correct: false },
      { text: 'Before starting the work to discuss hazards and precautions', correct: true },
      { text: 'Only at the end of the month', correct: false },
      { text: 'After workers leave the site', correct: false }
    ]
  },
  {
    question: 'What is the purpose of Lockout/Tagout (LOTO)?',
    answers: [
      { text: 'To identify workers on site', correct: false },
      { text: 'To increase equipment operating speed', correct: false },
      { text: 'To prevent unexpected energization or release of hazardous energy', correct: true },
      { text: 'To replace electrical inspections', correct: false }
    ]
  },
  {
    question: 'What should a Safety Officer do when a serious unsafe condition is identified?',
    answers: [
      { text: 'Ignore it if work is behind schedule', correct: false },
      { text: 'Wait until the end of the shift', correct: false },
      { text: 'Stop the affected work, make the area safe, and ensure corrective action', correct: true },
      { text: 'Ask workers to continue carefully', correct: false }
    ]
  }
];
