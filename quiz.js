 const questions = [
  {
    question: 'True or False: The sky is blue',
    answers: ['True', 'False'],
    correctAnswer: ['True']
  },
  {
    question: 'Which of the following is in the ocean? (select all that apply)',
    answers: ['Fish', 'Shark', 'Horse', 'Cow', 'Starfish'],
    correctAnswer: ['Fish', 'Shark', 'Starfish']
  },
  {
    question: 'What is in the rainforest?',
    answers: ['Blue macaw', 'Cow', 'Fish', 'Pig'],
    correctAnswer: ['Blue macaw']
  }
];

let currentQuestion = 0;
let score = 0;

const quizDiv = document.querySelector('#quiz');
const questionDiv = document.querySelector('#question');
const answersDiv = document.querySelector('#answers');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const submitButton = document.querySelector('#submit');
const resultDiv = document.querySelector('#result');

function showQuestion() {

  const question = questions[currentQuestion];

  questionDiv.textContent = question.question;
  answersDiv.innerHTML = '';

  for (let i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i];
    const input = document.createElement('input');
    input.type = question.correctAnswer instanceof Array ? 'checkbox' : 'radio';
    input.name = `q${currentQuestion}`;
    input.value = answer;
    const label = document.createElement('label');
    label.textContent = answer;
    answersDiv.appendChild(input);
    answersDiv.appendChild(label);
    answersDiv.appendChild(document.createElement('br'));
  }
  document.getElementById("start").style.display="none";
}


function submitAnswer() {
  const selectedInputs = document.querySelectorAll(`input[name=q${currentQuestion}]:checked`);

  if (selectedInputs.length === 0) {
    alert('Please select an answer');
    return;
  }

  let selectedAnswers = [];
  for (let i = 0; i < selectedInputs.length; i++) {
    selectedAnswers.push(selectedInputs[i].value);
  }

  const question = questions[currentQuestion];

  if (JSON.stringify(selectedAnswers) === JSON.stringify(question.correctAnswer)) {
    score++;
  }

  if (currentQuestion < questions.length-1) {
    showQuestion();
  } else {
    showResult();
  }
  console.log("Score is " + score);
}


function showResult() {
  var scoreCard = document.getElementById("score");
  var resultCard = document.getElementById("result");
  
  let totalScore = score;

  const percentage = Math.round(totalScore / questions.length * 100);
  let output = '';

  if (percentage >= 90) {
    output = `Amazing job! You really know your stuff! You got ${percentage}%!`;
  } else if (percentage >= 80) {
    output = `Great job! You got ${percentage}%!`;
  } else if (percentage >= 70) {
    output = `Good job! You passed! You got ${percentage}%!`;
  } else {
    output = `Oops! Maybe you should go back and study some more. You got ${percentage}%`;
  }
  scoreCard.innerHTML="Your Final Score is : " + score;
  resultCard.innerHTML="Your Result based on your solution : " + output;
  
}

previousButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

nextButton.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    submitAnswer();
    currentQuestion++;
    showQuestion();
  } else if (currentQuestion === questions.length -1) {
    submitAnswer();
    showResult();
  }
  if(currentQuestion==2){
    document.getElementById("next").style.display="none";
    document.getElementById("submit").style.display="block";
    document.getElementById("previous").style.display="none";
  }else{
    document.getElementById("next").style.display="block";
    document.getElementById("submit").style.display="none";
  }
  console.log(currentQuestion);
});


submitButton.addEventListener('click', () => {
  submitAnswer();
  showResult();
});
