// State Management
let currentStep = 0;
let userAnswers = {
    type: '', // 'movie' or 'season'
    q1: '',
    q2: '',
    q3: ''
};

// Questions for Movies
const movieQuestions = [
    {
        question: "What genre do you want?",
        options: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"]
    },
    {
        question: "Have you watched something similar you liked?",
        options: ["Yes, I want something similar", "No, surprise me"]
    },
    {
        question: "What's your mood right now?",
        options: ["Happy", "Sad", "Excited", "Chill", "Scared"]
    }
];

// Questions for Seasons
const seasonQuestions = [
    {
        question: "What genre do you want?",
        options: ["Drama", "Comedy", "Thriller", "Fantasy", "Crime", "Sci-Fi"]
    },
    {
        question: "How long can you commit?",
        options: ["Short (1 season)", "Medium (2-3 seasons)", "Long (4+ seasons)"]
    },
    {
        question: "What kind of ending do you prefer?",
        options: ["Completed series", "Ongoing series", "Don't care"]
    }
];

// Movie/Season Database
const movieDatabase = {
    "Action-Happy": { title: "Guardians of the Galaxy", description: "An action-packed space adventure with humor and heart!" },
    "Action-Excited": { title: "Mad Max: Fury Road", description: "Non-stop adrenaline-pumping action in a post-apocalyptic world!" },
    "Comedy-Happy": { title: "The Grand Budapest Hotel", description: "A whimsical and funny adventure through a luxury hotel!" },
    "Drama-Sad": { title: "Manchester by the Sea", description: "A deeply emotional story about loss and healing." },
    "Horror-Scared": { title: "Hereditary", description: "A terrifying family horror that will haunt you!" },
    "Sci-Fi-Excited": { title: "Inception", description: "Mind-bending action thriller about dreams within dreams!" },
    "Romance-Happy": { title: "The Princess Bride", description: "A charming fairy tale romance with adventure!" },
    "default": { title: "Pulp Fiction", description: "A modern classic that everyone should watch!" }
};

const seasonDatabase = {
    "Drama-Short": { title: "Chernobyl", description: "An intense 5-episode miniseries about the nuclear disaster." },
    "Comedy-Medium": { title: "Fleabag", description: "A hilarious and heartbreaking comedy (2 seasons)." },
    "Thriller-Long": { title: "Breaking Bad", description: "The ultimate crime thriller with 5 amazing seasons!" },
    "Fantasy-Medium": { title: "The Witcher", description: "Epic fantasy adventure with monsters and magic!" },
    "Crime-Long": { title: "Better Call Saul", description: "Brilliant prequel to Breaking Bad with 6 seasons." },
    "Sci-Fi-Completed": { title: "Dark", description: "A mind-bending time travel mystery (3 seasons, completed)." },
    "default": { title: "Stranger Things", description: "A nostalgic sci-fi thriller perfect for binge-watching!" }
};

// Typewriter Effect
function typeWriter(text, element, callback) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Change Luffy Image
function changeLuffyImage(imageName) {
    const luffyImg = document.getElementById('luffy-img');
    luffyImg.src = `images/${imageName}`;
}

// Theme Changer
document.getElementById('theme-btn').addEventListener('click', () => {
    const themeOptions = document.getElementById('theme-options');
    themeOptions.classList.toggle('hidden');
});

function changeTheme(theme) {
    document.body.className = `theme-${theme}`;
    document.getElementById('theme-options').classList.add('hidden');
}

// Initial Dialogue
window.addEventListener('load', () => {
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    
    // Start with welcome.png (already set in HTML)
    typeWriter("Do you ever feel like you can't find a good movie to watch?", dialogueText, () => {
        dialogueOptions.innerHTML = `
            <button onclick="handleYesNo('yes')">YES</button>
            <button onclick="handleYesNo('no')">NO</button>
        `;
    });
});

// Handle Yes/No Response
function handleYesNo(answer) {
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    const continueBtn = document.getElementById('continue-btn');
    
    if (answer === 'no') {
        changeLuffyImage('no.png'); // Show sad Luffy
        dialogueOptions.innerHTML = '';
        typeWriter("Oh... Well, goodbye then! 😢", dialogueText, () => {
            setTimeout(() => {
                document.body.innerHTML = '<div style="background:#000; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; color:#fff; font-size:48px; font-family:Courier New;">GOODBYE!</div>';
            }, 2000);
        });
    } else {
        dialogueOptions.innerHTML = '';
        typeWriter("Then I've got the perfect thing for you! All you have to do is answer 3 quick questions and you'll get a movie to chill with! (or cry)", dialogueText, () => {
            continueBtn.classList.remove('hidden');
        });
    }
}

// Continue Button
document.getElementById('continue-btn').addEventListener('click', () => {
    changeLuffyImage('whiletyping.png'); // Change to typing animation
    document.getElementById('dialogue-box').style.display = 'none';
    document.getElementById('overlay').classList.add('fade-out');
    document.getElementById('luffy-container').classList.add('minimize');
    document.getElementById('question-screen').classList.remove('hidden');
});

// Select Type (Movie or Season)
function selectType(type) {
    userAnswers.type = type;
    document.querySelector('.type-selector').style.display = 'none';
    document.getElementById('questions-container').classList.remove('hidden');
    
    const questions = type === 'movie' ? movieQuestions : seasonQuestions;
    loadQuestions(questions);
}

// Load Questions
function loadQuestions(questions) {
    questions.forEach((q, index) => {
        const questionNum = index + 1;
        document.getElementById(`q${questionNum}-text`).textContent = `${questionNum}. ${q.question}`;
        
        const optionsContainer = document.getElementById(`q${questionNum}-options`);
        optionsContainer.innerHTML = '';
        
        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.onclick = () => selectAnswer(questionNum, option, btn);
            optionsContainer.appendChild(btn);
        });
    });
    
    document.getElementById('submit-btn').classList.remove('hidden');
}

// Select Answer
function selectAnswer(questionNum, answer, button) {
    userAnswers[`q${questionNum}`] = answer;
    
    // Remove 'selected' class from all buttons in this question
    const allButtons = button.parentElement.querySelectorAll('button');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to clicked button
    button.classList.add('selected');
}

// Submit and Get Recommendation
document.getElementById('submit-btn').addEventListener('click', () => {
    if (!userAnswers.q1 || !userAnswers.q2 || !userAnswers.q3) {
        alert('Please answer all questions!');
        return;
    }
    
    // Hide question screen
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('luffy-container').classList.add('hidden');
    
    // Show thinking screen
    document.getElementById('thinking-screen').classList.remove('hidden');
    
    // Wait 3 seconds then show result
    setTimeout(() => {
        const recommendation = getRecommendation();
        showResult(recommendation);
    }, 3000);
});

// Get Recommendation Logic
function getRecommendation() {
    const database = userAnswers.type === 'movie' ? movieDatabase : seasonDatabase;
    
    // Simple matching logic (you can make this more sophisticated)
    let key = `${userAnswers.q1}-${userAnswers.q3}`;
    
    // Try to find exact match
    if (database[key]) {
        return database[key];
    }
    
    // Try genre match
    key = userAnswers.q1;
    if (database[key]) {
        return database[key];
    }
    
    // Return default
    return database['default'];
}

// Show Result
function showResult(recommendation) {
    document.getElementById('thinking-screen').classList.add('hidden');
    
    const resultScreen = document.getElementById('result-screen');
    document.getElementById('result-title').textContent = recommendation.title;
    document.getElementById('result-description').textContent = recommendation.description;
    
    resultScreen.classList.remove('hidden');
}

// Restart
function restart() {
    location.reload();
}