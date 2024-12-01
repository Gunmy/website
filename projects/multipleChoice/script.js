// Variables
let questions = [];
let currentQuestionIndex = null;
let currentQuestion = null;

// Fetch questions from the JSON file
fetch('questions.json')
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    loadNewQuestion();
  })
  .catch((error) => console.error('Error fetching questions:', error));

// DOM Elements
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const checkAnswerBtn = document.getElementById('check-answer-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');

// Load a new random question
function loadNewQuestion() {
  resultElement.textContent = '';
  nextQuestionBtn.style.display = 'none';
  checkAnswerBtn.style.display = 'block';

  // Select a random question
  currentQuestionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[currentQuestionIndex];

  // Display question and answers
  questionElement.textContent = currentQuestion.question;
  const allAnswers = [...currentQuestion.fake, ...currentQuestion.true];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  // Clear and populate answers
  answersElement.innerHTML = '';
  shuffledAnswers.forEach((answer, index) => {
    const answerId = `answer-${index}`;
    const answerHTML = `
    <div class="vbox">
      <label class="lbox">
        <input type="checkbox" id="${answerId}" value="${answer}">
        <span>${answer}</span>
      </label>
    </div>
    `;
    answersElement.insertAdjacentHTML('beforeend', answerHTML);
  });
}

// Check the user's answers
checkAnswerBtn.addEventListener('click', () => {
  const selectedAnswers = Array.from(
    answersElement.querySelectorAll('input[type="checkbox"]:checked')
  ).map((input) => input.value);

  const correctAnswers = currentQuestion.true;
  const isCorrect =
    selectedAnswers.length === correctAnswers.length &&
    selectedAnswers.every((answer) => correctAnswers.includes(answer));

  // Show the result
  if (isCorrect) {
    resultElement.textContent = 'Correct! 🎉';
    resultElement.style.color = 'green'; // Correct answer text in green
  } else {
    resultElement.textContent = 'Incorrect. Correct answers are:';
    resultElement.style.color = 'red';  // Set text color to red for incorrect answers
    
    // Create the list for correct answers
    const ul = document.createElement('ul');
    correctAnswers.forEach((answer) => {
      const li = document.createElement('li');
      li.textContent = answer;
      ul.appendChild(li);
    });
    resultElement.appendChild(ul);

    // Highlight incorrect answers in red
    Array.from(answersElement.querySelectorAll('input[type="checkbox"]')).forEach((input) => {
      const label = input.parentElement;
      const answerText = label.querySelector('span').textContent;

      if (!correctAnswers.includes(answerText)) {
        label.querySelector('span').style.color = 'red';  // Highlight incorrect answers
      } else {
        label.querySelector('span').style.color = 'green';
      }
    });
  }

  // Hide the check answer button and show the next question button
  checkAnswerBtn.style.display = 'none';
  nextQuestionBtn.style.display = 'block';
});

// Load the next question
nextQuestionBtn.addEventListener('click', loadNewQuestion);
