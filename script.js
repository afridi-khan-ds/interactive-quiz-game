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

// ALL 10 QUIZ QUESTIONS
const questions = [
  {
    question: 'Which fruit is known for having a "crown" on top and shares its name with a type of fish?',
    answers: [
      { text: 'Mango', correct: false },
      { text: 'Apple', correct: false },
      { text: 'Pine Apple', correct: true },
      { text: 'Coconut', correct: false }
    ]
  },
  {
    question: 'What color are flamingos when they are born?',
    answers: [
      { text: 'White or Grey', correct: true },
      { text: 'Pink or magenta', correct: false },
      { text: 'White or Yellow', correct: false },
      { text: 'White or black', correct: false }
    ]
  },
  {
    question: 'What is a group of lions called?',
    answers: [
      { text: 'Troop', correct: false },
      { text: 'Murder', correct: false },
      { text: 'Mufasa', correct: false },
      { text: 'Pride', correct: true }
    ]
  },
  {
    question: 'What is the slowest animal in the world?',
    answers: [
      { text: 'Snails', correct: false },
      { text: 'Panda', correct: false },
      { text: 'Sloths', correct: true },
      { text: 'Star Fish', correct: false }
    ]
  },
  {
    question: 'How many years can a snail sleep for?',
    answers: [
      { text: 'Two', correct: false },
      { text: 'Three', correct: true },
      { text: 'Four', correct: false },
      { text: 'Five', correct: false }
    ]
  },
  {
    question: 'Which mammal has no vocal cords?',
    answers: [
      { text: 'Llama', correct: false },
      { text: 'Giraffe', correct: true },
      { text: 'Whale', correct: false },
      { text: 'Bat', correct: false }
    ]
  },
  {
    question: 'How many eyes does a honeybee have?',
    answers: [
      { text: 'Five', correct: true },
      { text: 'Six', correct: false },
      { text: 'Seven', correct: false },
      { text: 'Eight', correct: false }
    ]
  },
  {
    question: 'How many hearts does an octopus have?',
    answers: [
      { text: 'One', correct: false },
      { text: 'Two', correct: false },
      { text: 'Three', correct: true },
      { text: 'Eight', correct: false }
    ]
  },
  {
    question: 'What do you call a group of kangaroos?',
    answers: [
      { text: 'Assembly', correct: false },
      { text: 'Murder', correct: false },
      { text: 'Pride', correct: false },
      { text: 'Troop', correct: true }
    ]
  },
  {
    question: 'What is a group of crows called?',
    answers: [
      { text: 'Assembly', correct: false },
      { text: 'Murder', correct: true },
      { text: 'Pride', correct: false },
      { text: 'Troop', correct: false }
    ]
  }
];