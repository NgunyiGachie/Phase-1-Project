document.addEventListener("DOMContentLoaded", async (event) => {

    const questions = [
        { 
            question: "I am bordered by Mongolia, Russia, Kyrgyzstan in the North and Vietnam in the South. What is my capital city?",
            image: "./Project Photos/Beijing.jpg",
            answers: [
                {option: "Beijing", correct: "true"}, 
                {option: "Pyongyang", correct: "false"}, 
                {option: "Hanoi", correct: "false"}, 
                {option: "Seoul", correct: "false"}, 
                {option: "Kabul", correct: "false"},
            ],
        },
        
        {
            question: "I am bordered by every South American country except Chile. What is my capital city?",
            image: "./Project Photos/SouthAmerica.jpg",
            answers: [
                {option: "Buenos Aires", correct: "false"}, 
                {option: "Bogota", correct: "false"}, 
                {option: "Brasilia", correct: "true"}, 
                {option: "Rio De Janeiro", correct: "false"}, 
                {option: "Montevideo", correct: "false"},
            ],
        },
        {
            question: "I am bordered by Singapore, Phillipines, and India. I am renowned for having the largest coastline in the world. What is my capital city?",
            image: "./Project Photos/Indonesia.jpg",
            answers: [
                    {option: "Jakarta", correct: "true"}, 
                    {option: "Moresby", correct: "false"}, 
                    {option: "Canberra", correct: "false"}, 
                    {option: "Kuala Lumpur", correct: "false"}, 
                    {option: "Bangkok", correct: "false"},
            ],
        },
        {
            question: "I am bordered by the Atlantic Ocean, Algeria, and Mali. I am also host to a geographical pecularity called the 'Eye of the Sahara'. What is my capital city?",
            image: "./Project Photos/Mauritania.jpg",
            answers: [
                {option: "Tripoli", correct: "false"}, 
                {option: "Rabat", correct: "false"}, 
                {option: "Dakar", correct: "false"}, 
                {option: "Tunis", correct: "false"}, 
                {option: "Nouakchott", correct: "true"},
            ],
        },
        {
            question: "I have no land border because I am an island nation. The capital of my nearest neighbor is Ottawa. What is my capital city?",
            image: "./Project Photos/Greenland.jpg",
            answers: [
                {option: "Reykjavik", correct: "false"}, 
                {option: "Copenhagen", correct: "false"}, 
                {option: "Nuuk", correct: "true"}, 
                {option: "Torshavn", correct: "false"}, 
                {option: "Oslo", correct: "false"},
            ],
        },
        {
            question: "My border in the North is the largest international border in the world. I also border two oceans in the East and West. What is my capital city?",
            image: "./Project Photos/U.S..jpg",
            answers: [
                {option: "Ottawa", correct: "false"}, 
                {option: "Moscow", correct: "false"}, 
                {option: "Washington D.C.", correct: "true"}, 
                {option: "Mexico City", correct: "false"}, 
                {option: "Beijing", correct: "false"},
            ],
        },
        {
            question: "I have the most country borders in Africa. I am also the continent's second largest country. What is my capital city?",
            image: "./Project Photos/DRC.jpg",
            answers: [
                {option: "Kinshasa", correct: "true"}, 
                {option: "Algiers", correct: "false"}, 
                {option: "Khartoum", correct: "false"}, 
                {option: "Niamey", correct: "false"}, 
                {option: "Abuja", correct: "false"},
            ],
        },
        {
            question: "I am somewhere between Asia and Europe. I also border the following seas: The Black Sea, The Mediterranian Sea, and The Aegean Sea. What is my capital city?",
            image: "./Project Photos/Turkey.jpg",
            answers: [
                {option: "Athens", correct: "false"}, 
                {option: "Ankara", correct: "true"}, 
                {option: "Riga", correct: "false"}, 
                {option: "Tbilisi", correct: "false"}, 
                {option: "Yerevan", correct: "false"},
            ],
        },
        {
            question: "I am the most mountanious country in Europe. Two of my five borders are Italy and France. What is my capital city?",
            image: "./Project Photos/Switzerland.jpg",
            answers: [
                {option: "Berlin", correct: "false"}, 
                {option: "Madrid", correct: "false"}, 
                {option: "London", correct: "false"}, 
                {option: "Vienna", correct: "false"}, 
                {option: "Bern", correct: "true"},
            ],
        },
        {
            question: "I appear as an S shape on the map. I am bordered by China, Laos, and Cambodia. What is my capital city?",
            image: "./Project Photos/Vietnam.jpg",
            answers: [
                {option: "Phnom Penh", correct: "false"}, 
                {option: "Bangkok", correct: "false"}, 
                {option: "Hanoi", correct: "true"}, 
                {option: "Seoul", correct: "false"}, 
                {option: "Tokyo", correct: "false"},
            ],
        }
    ];

    function fetchQuestions() {
        fetch('http://localhost:3001/questions')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            questions = data;
            beginQuiz();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    const questionElements = document.getElementById('question');
    const answerContainer = document.getElementById('answers');
    const proceedButton = document.getElementById('proceed-button');
    let presentQuestionIndex = 0;
    let score = 0;

    function beginQuiz() {
        presentQuestionIndex = 0;
        score = 0;
        proceedButton.textContent = "Proceed";
        showQuestion();
    }
    
    function showQuestion() {
        rePopulateOptions();
        let presentQuestion = questions[presentQuestionIndex];
        let questionNumber = presentQuestionIndex + 1;
        questionElements.innerHTML = ''; // Clear the question container
    
        // Display image if available
        if (presentQuestion.image) {
            const img = document.createElement("img");
            img.src = presentQuestion.image;
            img.alt = presentQuestion.question;
            img.classList.add("question-image");
            questionElements.appendChild(img);
        }
    
        const questionText = document.createElement("div");
        questionText.innerHTML = questionNumber + ". " + presentQuestion.question;
        questionElements.appendChild(questionText);
    
        presentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.option;
            button.classList.add("option");
            answerContainer.appendChild(button);
            if(answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", yourAnswer);
        });
    }
    

    function yourAnswer(e) {
        const selectedOption = e.target;
        const correctAnswer = selectedOption.dataset.correct === "true";
        if(correctAnswer) {
            selectedOption.classList.add("correct");
            score++
        } else{
            selectedOption.classList.add("incorrect")
        }
        Array.from(answerContainer.children).forEach(button => {
            if(button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        proceedButton.style.display = "block";
    }
    function rePopulateOptions() {
        proceedButton.style.display = "none";
        while(answerContainer.firstChild) {
            answerContainer.removeChild(answerContainer.firstChild);
        }
    }


    function activateProceedButton() {
        presentQuestionIndex++
        if(presentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            revealResults();
        }
    }

    function revealResults() {
        rePopulateOptions();
        questionElements.innerHTML = `Your quiz score is ${score} out of ${questions.length}`;
        proceedButton.textContent = "Retake Quiz";
        proceedButton.style.display = "block";
    }


    proceedButton.addEventListener('click', () => {
        if(presentQuestionIndex < questions.length) {
            activateProceedButton();
        } else{
            beginQuiz();
        }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if(presentQuestionIndex < questions.length) {
                activateProceedButton();
            } else {
                beginQuiz();
            }
        }
    })
    answerContainer.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('option')) {
            event.target.classList.add('hovered');
        }
    });
    
    answerContainer.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('option')) {
            event.target.classList.remove('hovered');
        }
    });    
    })
    beginQuiz();
   
});


