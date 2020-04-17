let questionForm = document.querySelector("#question-form");
let questionCard = document.querySelector("#question-box");
let resultCard = document.querySelector("#result-box");
let resultDetail = document.querySelector("#result-detail");
let resultMessage = document.querySelector("#result-message");

let endPoint = "https://opentdb.com/api.php?";
let questionList = [];
let gameSummary = [];
let correctCount = 0;
let falseCount = 0;

let results = [];

const getInput = () => {
  const questionAmount = document.querySelector("#question-amount").value;
  const categoryId = document.querySelector("#question-category").value;
  const levelId = document.querySelector("#question-difficulty").value;
  getTriviaContent(questionAmount, categoryId, levelId);
};

const getTriviaContent = (amount, cat, level) => {
  fetch(url(amount, cat, level))
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((question) => questionList.push(question));
      console.log(questionList);
      launchGame(amount);
    })
    .catch((error) => console.error("error:", error));
};

const launchGame = (amount, number = 0) => {
  console.log("launchGame", questionList[number], amount, number);
  questionCard.innerHTML = "";

  if (number < amount) {
    displayQuestion(questionList[number], amount, number);
  } else {
    displayResult(amount);
  }
};

const checkAnswer = (correctAnswer, amount, number, answer) => {
  console.log(amount, number);

  if (correctAnswer == answer) {
    console.log("true");
    correctCount++;
    results.push([questionList[number].question, correctAnswer, answer, true]);
  } else {
    console.log("false");
    falseCount++;
    results.push([questionList[number].question, correctAnswer, answer, false]);
  }
  console.log(results);
  anime({
    targets: "#question-box",
    translateX: [0, 1500],
  });

  number++;

  setTimeout(function () {
    launchGame(amount, number);
  }, 500);
};

//Functionnal function
const url = (amount, cat, level) => {
  return `${endPoint}amount=${amount}&category=${cat}&difficulty=${level}&type=multiple`;
};

//Display Function
const displayQuestion = (question, amount, number) => {
  let questionTitle = question.question;
  let correctAnswer = question.correct_answer;
  let answerList = [
    question.correct_answer,
    question.incorrect_answers[0],
    question.incorrect_answers[1],
    question.incorrect_answers[2],
  ];

  randomList = getRandomArray();

  let answer1 = answerList[randomList[0]];
  let answer2 = answerList[randomList[1]];
  let answer3 = answerList[randomList[2]];
  let answer4 = answerList[randomList[3]];
  anime({
    targets: "#question-box",
    translateX: [-200, 0],
  });
  questionCard.innerHTML += `<div class="text-center card m-5">
  <div class="m-3 card-body">
    <p id="question">
      ${questionTitle}
    </p>
    <div class="row">
      <div class="col-sm-6">
        <button type="button" id="${answer1}" onclick="checkAnswer('${correctAnswer}', ${amount}, ${number}, '${answer1}')" class="btn btn-light">${answer1}</button>
      </div>
      <div class="col-sm-6">
        <button type="button" id="${answer2}" onclick="checkAnswer('${correctAnswer}', ${amount}, ${number}, '${answer2}')" class="btn btn-light">${answer2}</button>
      </div>
    </div>
    <div class="mb-3 mt-3 row">
      <div class="col-sm-6">
        <button type="button" id="${answer3}" onclick="checkAnswer('${correctAnswer}',${amount}, ${number}, '${answer3}')" class="btn btn-light">${answer3}</button>
      </div>
      <div class="col-sm-6">
        <button type="button" id="${answer4}" onclick="checkAnswer('${correctAnswer}',${amount}, ${number}, '${answer4}')" class="btn btn-light">${answer4}</button>
      </div>
    </div>
  </div>
</div>`;
};

const displayResult = (amount) => {
  resultMessage.innerHTML = `
  <h3>Well done my friend. You have ${correctCount} correct answers out of ${amount} !</h3>`;
  resultCard.classList.remove("not-visible");
  results.forEach((result) => {
    console.log(result);
    resultDetail.innerHTML += `
    <tr>
      <td>${result[0]}</td>
      <td>${result[1]}</td>
      <td>${result[2]}</td>
      <td>${result[3]}</td>
    </tr>
    `;
  });
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomArray = () => {
  let array = [];
  while (array.length != 4) {
    let number = getRandomIntInclusive(0, 3);
    if (!array.includes(number)) array.push(number);
  }
  return array;
};

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getInput();
});
