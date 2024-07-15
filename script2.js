document.addEventListener('DOMContentLoaded', () => {
    const streakCount = document.getElementById('streak-count');
    const visitButton = document.getElementById('visit-button');
    const increaseStreakButton = document.getElementById('increase-streak');
    const decreaseStreakButton = document.getElementById('decrease-streak');
    const questionsContainer = document.getElementById('questions-container');
    const submitAnswersButton = document.getElementById('submit-answers');

    let streak = parseInt(localStorage.getItem('streak')) || 0;
    let lastVisit = localStorage.getItem('lastVisit') ? new Date(localStorage.getItem('lastVisit')) : null;

    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    const updateStreak = () => {
        streakCount.textContent = streak;
        localStorage.setItem('streak', streak);
        fireStreakEvent();
    };

    const fireStreakEvent = () => {
        // You can fire any events or call any functions here
        console.log(`Streak updated: ${streak} days`);
        // Add any additional functionality here
    };

    const questions = [
        { question: "What color is typically worn for a formal event?", options: ["Red", "Black", "Yellow", "Green"], answer: "Black" },
        { question: "What type of clothing is commonly worn during summer?", options: ["Sweaters", "Shorts", "Coats", "Scarves"], answer: "Shorts" },
        { question: "Which accessory is worn around the neck?", options: ["Bracelet", "Necklace", "Ring", "Earring"], answer: "Necklace" },
        { question: "What type of shoes are usually worn during exercise?", options: ["Sandals", "Boots", "Sneakers", "Heels"], answer: "Sneakers" },
        { question: "What is the purpose of wearing sunglasses?", options: ["To see better at night", "To protect eyes from the sun", "To read better", "To look taller"], answer: "To protect eyes from the sun" },
        { question: "What is typically worn on your feet in winter?", options: ["Flip-flops", "Sandals", "Boots", "Sneakers"], answer: "Boots" },
        { question: "Which piece of clothing is worn on the upper body?", options: ["Pants", "Hat", "Shirt", "Shoes"], answer: "Shirt" },
        { question: "What do you wear on your head to protect from the sun?", options: ["Gloves", "Hat", "Scarf", "Belt"], answer: "Hat" },
        { question: "What is the common term for denim trousers?", options: ["Jeans", "Shorts", "Skirt", "T-shirt"], answer: "Jeans" },
        { question: "Which of these is a common fabric for t-shirts?", options: ["Leather", "Cotton", "Wool", "Silk"], answer: "Cotton" }
    ];

    const getRandomQuestions = (num) => {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const displayQuestions = () => {
        const randomQuestions = getRandomQuestions(5);
        questionsContainer.innerHTML = '';

        randomQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            let optionsHTML = '';
            q.options.forEach(option => {
                optionsHTML += `
                    <label>
                        <input type="radio" name="question-${index}" value="${option}">
                        ${option}
                    </label><br>
                `;
            });

            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${optionsHTML}
            `;

            questionsContainer.appendChild(questionDiv);
        });

        submitAnswersButton.classList.remove('hidden');
    };

    const checkAnswers = () => {
        const randomQuestions = getRandomQuestions(5);
        let correctAnswers = 0;

        randomQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                correctAnswers += 1;
            }
        });

        return correctAnswers;
    };

    const handleQuizSubmit = () => {
        const correctAnswers = checkAnswers();

        if (correctAnswers === 5) {
            streak += 1;
            updateStreak();
            alert(`Congratulations! You've answered all questions correctly. Your streak is now ${streak} days.`);
        } else {
            alert(`You answered ${correctAnswers}/5 questions correctly. Try again.`);
        }
    };

    if (lastVisit) {
        const daysDifference = Math.round((today - lastVisit) / oneDay);

        if (daysDifference === 1) {
            streak += 1;
        } else if (daysDifference > 1) {
            streak = 1;
        }
    } else {
        streak = 1;
    }

    updateStreak();
    localStorage.setItem('lastVisit', today);

    visitButton.addEventListener('click', () => {
        localStorage.setItem('lastVisit', new Date());
        alert('Daily visit simulated. Refresh the page to see the updated streak.');
    });

    increaseStreakButton.addEventListener('click', () => {
        streak += 1;
        updateStreak();
    });

    decreaseStreakButton.addEventListener('click', () => {
        if (streak > 0) {
            streak -= 1;
        }
        updateStreak();
    });

    submitAnswersButton.addEventListener('click', handleQuizSubmit);

    // Display questions on page load
    displayQuestions();
});
