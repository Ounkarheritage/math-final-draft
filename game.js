let score = 0;
let correctAnswer;
let timeLeft = 60; // Timer set to 60 seconds
let timerInterval;

function generateEquation() {
    let a, b, c, d, equationText;

    // Equations with variables on both sides (Level 2)
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * 10);
    c = Math.floor(Math.random() * 10) + 1;
    d = Math.floor(Math.random() * 10);
    equationText = `${a}x - ${b} = ${c}x - ${d}`;
    
    // Calculate the correct answer for x
    correctAnswer = (d - b) / (a - c);
    
    // Display the equation
    document.getElementById('equation').innerText = equationText;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('feedback').innerText = "Time's up!";
            document.getElementById('feedback').style.color = "#dc3545";
            document.getElementById('answer').disabled = true; // Disable input
        }
    }, 1000);
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value.trim());
    const feedback = document.getElementById('feedback');

    // Check if the user input is a valid number
    if (isNaN(userAnswer)) {
        feedback.innerText = "Please enter a valid number.";
        feedback.style.color = "#dc3545";
        return;
    }

    // Define tolerance for floating-point comparisons
    const tolerance = 0.01;

    // Calculate the absolute difference between user answer and correct answer
    const difference = Math.abs(userAnswer - correctAnswer);

    // Check if the user answer matches either the correct answer or its negation
    if (difference < tolerance || Math.abs(userAnswer - (-correctAnswer)) < tolerance) {
        feedback.innerText = "Correct!";
        feedback.style.color = "#28a745";
        score++;
    } else {
        feedback.innerText = `Try again! The correct answer was ${correctAnswer.toFixed(2)}.`;
        feedback.style.color = "#dc3545";
    }

    // Update score and generate a new equation
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('answer').value = '';
    generateEquation();
}

function resetGame() {
    score = 0;
    timeLeft = 60; // Reset time
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
    document.getElementById('answer').disabled = false; // Enable input
    generateEquation();
    clearInterval(timerInterval); // Clear any existing interval
    startTimer(); // Start the timer
}

resetGame();