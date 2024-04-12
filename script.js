const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit');
const timerDisplay = document.getElementById('timer-display');

let score = 0;
let currentQuestionIndex = 0;
let totalTimeLeft = 30 * 60; // 30 minutes in seconds
let timerInterval;
// Define quiz questions and options
const questions = [
    {
      image: 'question1.png',
      options: ['ac/b', 'bc/a', 'ca/b', 'ab/c'],
      correctOption: 3
    },
    {
      image: 'question2.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 3
    },
    {
      image: 'question3.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 1
    },
    {
      image: 'question4.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 0
    },
    {
      image: 'question5.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 2
    },
    {
      image: 'question6.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 2
    },
    {
      image: 'question7.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 0
    },
    {
      image: 'question8.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 1
    },
    {
        image: 'question9.png',
        options: ['Option a', 'Option b', 'Option c', 'Option d'],
        correctOption: 0
      },
    {
      image: 'question10.png',
      options: ['Option a', 'Option b', 'Option c', 'Option d'],
      correctOption: 1
    }
  ];
// Function to load current question
function loadAllQuestions() {
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.innerHTML = `
        <img src="${question.image}" alt="Question ${index + 1}">
        <div class="options">
          ${question.options.map((option, optionIndex) => `
            <div class="option">
              <input type="radio" id="option${index}-${optionIndex}" name="options${index}" value="${optionIndex}">
              <label for="option${index}-${optionIndex}">${option}</label>
            </div>
          `).join('')}
        </div>
        <button class="clear-selection">Clear Selection</button>
      `;
      quizContainer.appendChild(questionElement);
    });
  }
  
  // Load all questions when page loads
  loadAllQuestions();

  function addClearSelectionListeners() {
    const clearSelectionButtons = document.querySelectorAll('.clear-selection');
    clearSelectionButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const selectedOption = document.querySelector(`input[name="options${index}"]:checked`);
        if (selectedOption) {
          selectedOption.checked = false; // Clear the selection
        }
      });
    });
  }
// Function to start the timer
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer display
function updateTimer() {
  const minutes = Math.floor(totalTimeLeft / 60);
  const seconds = totalTimeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  if (totalTimeLeft === 0) {
    clearInterval(timerInterval);
    submitTest();
  } else {
    totalTimeLeft--;
  }
}

// Function to submit the test
function submitTest() {
  clearInterval(timerInterval);
  calculateScore();
  showScoreScreen();
}

// Function to calculate the score
// Function to calculate the score
function calculateScore() {
    questions.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="options${index}"]:checked`);
      if (selectedOption && parseInt(selectedOption.value) === question.correctOption) {
        score++;
      }
    });
  }
  

// Function to show the score screen
function showScoreScreen() {
  quizContainer.innerHTML = `<h2>Your Score: ${score}</h2>`;
  submitButton.style.display = 'none';
}

startTimer();

// Event listener for submit button
submitButton.addEventListener('click', submitTest);
addClearSelectionListeners();