const vocabData = {
    1: [
        { hanzi: "爱", pinyin: "ài", meaning: "Cinta", options: ["Cinta", "Benci", "Makan", "Minum"] },
        { hanzi: "爸爸", pinyin: "bàba", meaning: "Ayah", options: ["Ibu", "Ayah", "Kakak", "Adik"] },
        { hanzi: "不客气", pinyin: "bù kèqì", meaning: "Sama-sama", options: ["Maaf", "Terima kasih", "Sama-sama", "Halo"] },
        { hanzi: "北京", pinyin: "Běijīng", meaning: "Beijing", options: ["Shanghai", "Beijing", "Tiongkok", "Jakarta"] },
        { hanzi: "杯子", pinyin: "bēizi", meaning: "Gelas", options: ["Piring", "Gelas", "Sendok", "Meja"] },
        { hanzi: "吃", pinyin: "chī", meaning: "Makan", options: ["Minum", "Makan", "Tidur", "Lari"] },
        { hanzi: "打电话", pinyin: "dǎ diànhuà", meaning: "Menelepon", options: ["Membaca", "Menelepon", "Melihat", "Menulis"] },
        { hanzi: "电脑", pinyin: "diànnǎo", meaning: "Komputer", options: ["TV", "HP", "Komputer", "Radio"] },
        { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "Maaf", options: ["Terima kasih", "Maaf", "Halo", "Sampai jumpa"] },
        { hanzi: "汉字", pinyin: "hànzì", meaning: "Karakter Mandarin", options: ["Buku", "Huruf", "Lagu", "Film"] },
        { hanzi: "老师", pinyin: "lǎoshī", meaning: "Guru", options: ["Murid", "Guru", "Dokter", "Polisi"] },
        { hanzi: "再见", pinyin: "zàijiàn", meaning: "Sampai jumpa", options: ["Halo", "Maaf", "Sampai jumpa", "Terima kasih"] },
        { hanzi: "谢谢", pinyin: "xièxiè", meaning: "Terima kasih", options: ["Halo", "Maaf", "Terima kasih", "Sama-sama"] }
    ],
    2: [
        { hanzi: "准备", pinyin: "zhǔnbèi", meaning: "Persiapan", options: ["Selesai", "Persiapan", "Mulai", "Pergi"] },
        { hanzi: "考试", pinyin: "kǎoshì", meaning: "Ujian", options: ["Belajar", "Ujian", "Bekerja", "Membaca"] },
        { hanzi: "虽然", pinyin: "suīrán", meaning: "Walaupun", options: ["Karena", "Tetapi", "Walaupun", "Jadi"] },
        { hanzi: "旅游", pinyin: "lǚyóu", meaning: "Wisata", options: ["Bekerja", "Wisata", "Makan", "Tidur"] },
        { hanzi: "帮助", pinyin: "bāngzhù", meaning: "Membantu", options: ["Membantu", "Bermain", "Bekerja", "Belajar"] },
        { hanzi: "唱歌", pinyin: "chànggē", meaning: "Menyanyi", options: ["Menari", "Menyanyi", "Menulis", "Membaca"] },
        { hanzi: "报纸", pinyin: "bàozhǐ", meaning: "Koran", options: ["Buku", "Koran", "Majalah", "Kertas"] },
        { hanzi: "服务员", pinyin: "fúwùyuán", meaning: "Pelayan", options: ["Dokter", "Pelayan", "Guru", "Supir"] },
        { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", meaning: "Bus", options: ["Bus", "Kereta", "Pesawat", "Mobil"] },
        { hanzi: "跳舞", pinyin: "tiàowǔ", meaning: "Menari", options: ["Menyanyi", "Menari", "Lari", "Jalan"] }
    ]
};

let currentLevel = 1;
let currentIndex = 0;
let score = 0;

// Ganti Level
function switchLevel(level) {
    currentLevel = level;
    currentIndex = 0;
    
    // UI Button update
    document.getElementById('btn-hsk1').classList.toggle('active', level === 1);
    document.getElementById('btn-hsk2').classList.toggle('active', level === 2);
    
    updateFlashcard();
    loadQuiz();
    displayVocabList();
}

// Flashcard
function flipCard() {
    document.getElementById('main-card').classList.toggle('flipped');
}

function updateFlashcard() {
    const data = vocabData[currentLevel][currentIndex];
    document.getElementById('hanzi').innerText = data.hanzi;
    document.getElementById('pinyin').innerText = data.pinyin;
    document.getElementById('meaning').innerText = data.meaning;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % vocabData[currentLevel].length;
    document.getElementById('main-card').classList.remove('flipped');
    setTimeout(updateFlashcard, 200);
}

// Kuis
function loadQuiz() {
    const data = vocabData[currentLevel];
    const item = data[Math.floor(Math.random() * data.length)];
    
    document.getElementById('question').innerText = `Apa arti dari "${item.hanzi}"?`;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    const shuffled = [...item.options].sort(() => Math.random() - 0.5);
    shuffled.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => {
            if(opt === item.meaning) {
                score += 10;
                alert("Benar! 🎉");
            } else {
                alert("Salah! Jawaban: " + item.meaning);
            }
            document.getElementById('current-score').innerText = score;
            loadQuiz();
        };
        optionsDiv.appendChild(btn);
    });
}

// List
function displayVocabList() {
    const list = document.getElementById('vocab-list');
    list.innerHTML = '';
    vocabData[currentLevel].forEach(item => {
        const div = document.createElement('div');
        div.className = 'vocab-item';
        div.innerHTML = `
            <span class="v-hanzi">${item.hanzi}</span>
            <span class="v-pinyin">${item.pinyin}</span>
            <span class="v-meaning">${item.meaning}</span>
        `;
        list.appendChild(div);
    });
}

// Start
window.onload = () => switchLevel(1);
