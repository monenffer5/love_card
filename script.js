const envelopeWrapper = document.getElementById('envelopeWrapper');
const popupWindow = document.getElementById('popupWindow');
const bowContainer = document.getElementById('bowContainer');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('questionText');
const catImg = document.getElementById('catImg');

let isDragging = false;
let startY = 0;

bowContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let pull = e.clientY - startY;
    
    // Натягиваем лук вниз
    if (pull > 0 && pull < 100) {
        bowContainer.style.transform = `translateY(${pull}px)`;
    }
});

window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    let pull = e.clientY - startY;
    
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
});

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (popupWindow.clientWidth - 90);
    const y = Math.random() * (popupWindow.clientHeight - 60);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

yesBtn.addEventListener('click', () => {
    questionText.innerHTML = "Yayyy! I love you too! ❤️";
    catImg.src = "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";
    noBtn.style.display = 'none';
});