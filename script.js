const envelopeWrapper = document.getElementById('envelopeWrapper');
const popupWindow = document.getElementById('popupWindow');
const bowContainer = document.getElementById('bowContainer');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('questionText');
const catImg = document.getElementById('catImg');

let isDragging = false;
let startY = 0;

// Функция начала перетаскивания (и мышь, и палец)
function startDrag(clientY) {
    isDragging = true;
    startY = clientY;
}

// Функция движения (и мышь, и палец)
function moveDrag(clientY) {
    if (!isDragging) return;
    let pull = clientY - startY;
    
    // Натягиваем лук вниз
    if (pull > 0 && pull < 100) {
        bowContainer.style.transform = `translateY(${pull}px)`;
    }
}

// Функция отпускания
function endDrag(clientY) {
    if (!isDragging) return;
    isDragging = false;
    let pull = clientY - startY;
    
    // Отпускаем — стрела летит в конверт
    if (pull > 35) {
        bowContainer.style.transition = 'transform 0.3s ease-in';
        bowContainer.style.transform = 'translateY(-300px)';
        
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            popupWindow.style.display = 'block';
        }, 200);
    } else {
        bowContainer.style.transition = 'transform 0.2s ease';
        bowContainer.style.transform = 'translateY(0px)';
    }
}

/* --- СОБЫТИЯ ДЛЯ МЫШКИ (ПК) --- */
bowContainer.addEventListener('mousedown', (e) => startDrag(e.clientY));
window.addEventListener('mousemove', (e) => moveDrag(e.clientY));
window.addEventListener('mouseup', (e) => endDrag(e.clientY));

/* --- СОБЫТИЯ ДЛЯ ТЕЛЕФОНА (ТАСКРИН) --- */
bowContainer.addEventListener('touchstart', (e) => {
    startDrag(e.touches[0].clientY);
    e.preventDefault(); // предотвращает лишние прокрутки страницы
});

window.addEventListener('touchmove', (e) => {
    moveDrag(e.touches[0].clientY);
});

window.addEventListener('touchend', (e) => {
    // В touchend берем changedTouches, так как палец уже оторван
    if (e.changedTouches.length > 0) {
        endDrag(e.changedTouches[0].clientY);
    }
});

// Кнопка "NO" убегает
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (popupWindow.clientWidth - 90);
    const y = Math.random() * (popupWindow.clientHeight - 60);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Для телефона кнопка NO может убегать и по тачу
noBtn.addEventListener('touchstart', (e) => {
    const x = Math.random() * (popupWindow.clientWidth - 90);
    const y = Math.random() * (popupWindow.clientHeight - 60);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    e.preventDefault();
});

yesBtn.addEventListener('click', () => {
    questionText.innerHTML = "Yayyy! I love you too! ❤️";
    catImg.src = "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";
    noBtn.style.display = 'none';
});