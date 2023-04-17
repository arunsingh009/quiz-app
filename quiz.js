const questions = [
  {
    question: "True or False: The sky is blue",
    options: ["True", "False"],
    answer: "True",
    type: "radio",
  },
  {
    question: "Which of the following is in the ocean?",
    options: ["fish", "shark", "horse", "cow", "starfish"],
    answer: ["fish", "shark", "starfish"],
    type: "checkbox",
  },
  {
    question: "What is in the rain forest?",
    options: ["Blue macaw", "cow", "fish", "pig"],
    answer: "Blue macaw",
    type: "radio",
  },
];

const quizContainer = document.getElementById("quiz-container");
const startQuizBtn = document.getElementById("start-quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  startQuizBtn.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  optionsEl.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];
    const input = document.createElement("input");
    input.type = currentQuestion.type;
    input.name = "answer";
    input.value = option;
    optionsEl.appendChild(input);
    optionsEl.appendChild(document.createTextNode(option));
  }
  if (currentQuestionIndex === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.innerText = "Submit";
  } else {
    nextBtn.innerText = "Next";
  }
}

function checkAnswer() {
  let currentQuestion = questions[currentIndex];
  let selectedAnswers = [];

  if (currentQuestion.type === 'truefalse') {
    // For true/false questions, only one answer can be selected
    selectedAnswers.push(document.querySelector('input[name="answer"]:checked').value);
  } else if (currentQuestion.type === 'multiple') {
    // For multiple-choice questions, get all selected answers
    let answerElements = document.querySelectorAll('input[name="answer"]:checked');
    for (let i = 0; i < answerElements.length; i++) {
      selectedAnswers.push(answerElements[i].value);
    }
  } else if (currentQuestion.type === 'checkbox') {
    // For checkbox questions, get all selected answers
    let answerElements = document.querySelectorAll('input[name="answer"]:checked');
    for (let i = 0; i < answerElements.length; i++) {
      selectedAnswers.push(answerElements[i].value);
    }
  }

  // Compare selected answers with correct answers
  let correctAnswers = currentQuestion.correctAnswers;
  let isCorrect = selectedAnswers.every(answer => correctAnswers.includes(answer));

  // Show feedback based on whether answer is correct
  let feedback = document.getElementById('feedback');
  if (isCorrect) {
    feedback.innerHTML = 'Correct!';
    feedback.style.color = 'green';
    score++;
  } else {
    feedback.innerHTML = 'Incorrect!';
    feedback.style.color = 'red';
  }

  // Disable answer inputs and show next question button
  let answerInputs = document.querySelectorAll('input[name="answer"]');
  for (let i = 0; i < answerInputs.length; i++) {
    answerInputs[i].disabled = true;
  }
  document.getElementById('nextBtn').style.display = 'block';
}
function showResults() {
  // Get all the answer containers
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // Keep track of the user's score
  let numCorrect = 0;

  // Loop through each question and check if the user's answer is correct
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // If the user's answer is correct, increment the score
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    }
  });

  // Calculate the percentage of correct answers
  const percentage = ((numCorrect / myQuestions.length) * 100).toFixed(2);

  // Display the appropriate message based on the user's score
  let message = "";
  if (percentage >= 90) {
    message = `Amazing Job! You really know your stuff! You got ${percentage}%`;
  } else if (percentage >= 80) {
    message = `Great Job! You got ${percentage}%`;
  } else if (percentage >= 70) {
    message = `Good job! You passed! You got ${percentage}%`;
  } else {
    message = `Oops! Maybe you should go back and study some more. You got ${percentage}%`;
  }

  // Display the message
  resultsContainer.innerHTML = message;
}

