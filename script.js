const hsk1Data = [
    { hanzi: "我", pinyin: "wǒ", meaning: "Saya", options: ["Saya", "Kamu", "Dia", "Mereka"] },
    { hanzi: "爱", pinyin: "ài", meaning: "Cinta", options: ["Makan", "Cinta", "Pergi", "Benci"] },
    { hanzi: "水", pinyin: "shuǐ", meaning: "Air", options: ["Api", "Tanah", "Air", "Kayu"] }
];

let currentIndex = 0;
let score = 0;

// Flashcard Logic
function flipCard() {
    document.querySelector('.card').classList.toggle('flipped');
}

function nextCard() {
    currentIndex = (currentIndex + 1) % hsk1Data.length;
    document.querySelector('.card').classList.remove('flipped');
    
    setTimeout(() => {
        document.getElementById('hanzi').innerText = hsk1Data[currentIndex].hanzi;
        document.getElementById('pinyin').innerText = hsk1Data[currentIndex].pinyin;
        document.getElementById('meaning').innerText = hsk1Data[currentIndex].meaning;
    }, 200);
}

// Quiz Logic
function loadQuiz() {
    const questionData = hsk1Data[Math.floor(Math.random() * hsk1Data.length)];
    document.getElementById('question').innerText = `Apa arti dari "${questionData.hanzi}"?`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    questionData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(opt, questionData.meaning);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
        alert("Benar! +10");
    } else {
        alert("Salah! Jawaban yang benar adalah: " + correct);
    }
    document.getElementById('current-score').innerText = score;
    loadQuiz();
}

// Inisialisasi awal
loadQuiz();
