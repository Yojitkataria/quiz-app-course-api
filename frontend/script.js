document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const progressContainer = document.getElementById("progress-container");
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");

  // Questions
  const questions = [
    {
      question: "What is the primary goal of Global Dream Connect?",
      choices: [
        "Test preparation only",
        "Helping students publish research papers",
        "Providing coding bootcamps",
        "Offering school textbooks",
      ],
      answer: "Helping students publish research papers",
    },
    {
      question: "Which group does Global Dream Connect primarily support?",
      choices: [
        "Graduate professors",
        "Working professionals",
        "High school and undergraduate students",
        "Corporate executives",
      ],
      answer: "High school and undergraduate students",
    },
    {
      question: "Which service is essential for turning an idea into a published paper?",
      choices: [
        "Social media marketing",
        "Expert mentorship",
        "Exam proctoring",
        "Paid advertisements",
      ],
      answer: "Expert mentorship",
    },
    {
      question: "What type of guidance helps students target top universities like the Ivy League?",
      choices: [
        "Sports coaching",
        "Career placement services",
        "Ivy League admissions guidance",
        "Language translation services",
      ],
      answer: "Ivy League admissions guidance",
    },
    {
      question: "Which platform model does Global Dream Connect primarily use?",
      choices: [
        "In-person classroom learning",
        "Virtual mentorship platform",
        "Self-paced textbook learning",
        "Offline workshops only",
      ],
      answer: "Virtual mentorship platform",
    },
  ];

  // State
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = {};

  // Event listeners
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  // Start quiz
  function startQuiz() {
    startBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    progressContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    showQuestion();
  }

  // Render question
  function showQuestion() {
    choicesList.innerHTML = "";
    nextBtn.classList.add("hidden");

    const current = questions[currentQuestionIndex];
    questionText.textContent = current.question;

    updateProgress();

    current.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      // Restore previous answer
      if (userAnswers[currentQuestionIndex]) {
        if (choice === current.answer) {
          li.classList.add("correct");
        }
        if (
          choice === userAnswers[currentQuestionIndex] &&
          choice !== current.answer
        ) {
          li.classList.add("wrong");
        }
      }

      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });

    prevBtn.style.display =
      currentQuestionIndex === 0 ? "none" : "inline-block";
  }

  // Handle answer selection
  function selectAnswer(li, choice) {
    if (userAnswers[currentQuestionIndex]) return;

    const correctAnswer = questions[currentQuestionIndex].answer;
    userAnswers[currentQuestionIndex] = choice;

    if (choice === correctAnswer) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
      [...choicesList.children].forEach((item) => {
        if (item.textContent === correctAnswer) {
          item.classList.add("correct");
        }
      });
    }

    nextBtn.classList.remove("hidden");
  }

  // Next question
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  // Previous question
  function prevQuestion() {
    currentQuestionIndex--;
    showQuestion();
  }

  // Show result
  function showResult() {
    questionContainer.classList.add("hidden");
    progressContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  // Restart quiz
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = {};
    resultContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
  }

  // Progress update
  function updateProgress() {
    progressText.textContent = `Question ${currentQuestionIndex + 1} / ${
      questions.length
    }`;
    progressFill.style.width =
      ((currentQuestionIndex + 1) / questions.length) * 100 + "%";
  }
});
