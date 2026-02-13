// Database Kosakata HSK 1
const hsk1Data = [
    { hanzi: "我", pinyin: "wǒ", meaning: "Saya", options: ["Saya", "Kamu", "Dia", "Mereka"] },
    { hanzi: "你", pinyin: "nǐ", meaning: "Kamu", options: ["Saya", "Kamu", "Makan", "Guru"] },
    { hanzi: "谢谢", pinyin: "xièxiè", meaning: "Terima kasih", options: ["Maaf", "Halo", "Terima kasih", "Bagus"] },
    { hanzi: "不客气", pinyin: "bù kèqì", meaning: "Sama-sama", options: ["Apa kabar", "Sama-sama", "Permisi", "Selamat pagi"] },
    { hanzi: "再见", pinyin: "zàijiàn", meaning: "Sampai jumpa", options: ["Halo", "Sampai jumpa", "Silakan", "Bisa"] },
    { hanzi: "爱", pinyin: "ài", meaning: "Cinta", options: ["Makan", "Minum", "Cinta", "Suka"] },
    { hanzi: "喝", pinyin: "hē", meaning: "Minum", options: ["Makan", "Minum", "Lari", "Tidur"] },
    { hanzi: "水", pinyin: "shuǐ", meaning: "Air", options: ["Api", "Tanah", "Angin", "Air"] },
    { hanzi: "老师", pinyin: "lǎoshī", meaning: "Guru", options: ["Murid", "Dokter", "Guru", "Ayah"] },
    { hanzi: "学生", pinyin: "xuésheng", meaning: "Murid", options: ["Murid", "Teman", "Ibu", "Sekolah"] }
];

let currentIndex = 0;
let score = 0;

// Logika Flashcard
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

// Logika Quiz
function loadQuiz() {
    const questionData = hsk1Data[Math.floor(Math.random() * hsk1Data.length)];
    document.getElementById('question').innerText = `Apa arti dari "${questionData.hanzi}" (${questionData.pinyin})?`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    // Acak urutan pilihan
    const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(opt => {
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
        alert("Benar! 🎉");
    } else {
        alert("Salah! Jawaban yang benar: " + correct);
    }
    document.getElementById('current-score').innerText = score;
    loadQuiz();
}

// Menampilkan Daftar Kosakata
function displayVocabList() {
    const vocabListDiv = document.getElementById('vocab-list');
    hsk1Data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'vocab-item';
        card.innerHTML = `
            <span class="v-hanzi">${item.hanzi}</span>
            <span class="v-pinyin">${item.pinyin}</span>
            <span class="v-meaning">${item.meaning}</span>
        `;
        vocabListDiv.appendChild(card);
    });
}

// Inisialisasi saat halaman dimuat
window.onload = () => {
    loadQuiz();
    displayVocabList();
};
