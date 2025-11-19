// ===== ОСНОВНЫЕ ПЕРЕМЕННЫЕ =====
let currentScene = 'main-room';

// ===== БАЗА СООБЩЕНИЙ =====
const messages = {
    // Сообщения для основной комнаты
    'bed-message': 'Это место, где мы делимся самыми сокровенными мыслями и мечтами. Каждая ночь рядом с тобой - это подарок...',
    'photo-message': 'Этот момент навсегда останется в моем сердце. Ты делаешь каждый день особенным просто тем, что ты есть...',
    'window-message': 'За этим окном целый мир, но мой мир - это ты. Все что мне нужно, уже здесь, рядом со мной...',

    // Сообщения для лица
    'eyes-message': 'Твои глаза - как глубокий океан, в котором я готов тонуть снова и снова. В них я вижу всю вселенную...',
    'lips-message': 'Твои губы рассказывают самые красивые истории, а твоя улыбка освещает даже самый темный день...',
    'hair-message': 'Твои волосы пахнут счастьем и домом. Когда я провожу по ним рукой, я чувствую, что нашел свой покой...',
    'smile-message': 'Твоя улыбка - мой самый большой источник вдохновения. Ради нее я готов свернуть горы...',

    // Сообщения для ночного неба
    'stars-message': 'Загадай желание, моя принцесса. Посмотри на эти звезды - каждая из них свидетельствует о моей любви к тебе. Я сделаю все, чтобы твои мечты сбылись... ✨',
    'moon-message': 'Эта луна освещает наш путь, как твоя любовь освещает мою жизнь. Даже в самой темной ночи ты - мой свет... 🌙'
};

// ===== ФУНКЦИИ НАВИГАЦИИ =====

// Показать сцену
function showScene(sceneId) {
    // Скрыть текущую сцену
    document.getElementById(currentScene).classList.remove('active');

    // Показать новую сцену
    document.getElementById(sceneId).classList.add('active');
    currentScene = sceneId;

    // Особые действия для определенных сцен
    if (sceneId === 'night-sky') {
        createStars();
        startShootingStars();
    }
}

// Показать сообщение
function showMessage(messageType) {
    const messageContent = document.getElementById('messageContent');
    const messageOverlay = document.getElementById('messageOverlay');

    if (messages[messageType]) {
        messageContent.textContent = messages[messageType];
        messageOverlay.style.display = 'flex';

        // Анимация появления
        setTimeout(() => {
            messageOverlay.style.opacity = '1';
        }, 10);
    }
}

// Закрыть сообщение
function closeMessage() {
    const messageOverlay = document.getElementById('messageOverlay');
    messageOverlay.style.opacity = '0';

    setTimeout(() => {
        messageOverlay.style.display = 'none';
    }, 300);
}

// ===== АНИМАЦИИ ЗВЕЗД =====

// Создать статичные звезды
function createStars() {
    const container = document.getElementById('night-sky');
    const existingStars = container.querySelectorAll('.star, .shooting-star');
    existingStars.forEach(star => star.remove());

    // Создаем 150 звезд
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Разный размер звезд
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Случайная позиция
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';

        // Разная яркость и анимация
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';

        container.appendChild(star);
    }
}

// Запуск падающих звезд
function startShootingStars() {
    // Очищаем предыдущие интервалы
    if (window.shootingStarInterval) {
        clearInterval(window.shootingStarInterval);
    }

    window.shootingStarInterval = setInterval(() => {
        if (Math.random() > 0.5) { // 50% шанс появления звезды
            createShootingStar();
        }
    }, 3000);
}

// Создать одну падающую звезду
function createShootingStar() {
    const container = document.getElementById('night-sky');
    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Начальная позиция (случайно в верхней части)
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 30 + 'vh';

    container.appendChild(star);

    // Удаляем звезду после анимации
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 2000);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Показываем основную сцену
    showScene('main-room');

    // Создаем звезды при загрузке (если нужно)
    if (document.getElementById('night-sky')) {
        createStars();
    }

    // Закрытие сообщения по клику на overlay
    document.getElementById('messageOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMessage();
        }
    });
});

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====

// Функция для быстрого добавления новых сообщений
function addNewMessage(key, text) {
    messages[key] = text;
}

// Пример использования:
// addNewMessage('new-message', 'Твой новый текст здесь...');