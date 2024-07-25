// script.js
window.onload = function() {
    var music = document.getElementById('background-music');
    music.play();
};

function toggleMusic() {
    var music = document.getElementById('background-music');
    var musicControl = document.getElementById('music-control');

    if (music.paused) {
        music.play();
        musicControl.textContent = 'Pausar';
    } else {
        music.pause();
        musicControl.textContent = 'Reproducir';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroParagraph = document.querySelector('.hero p');

    heroTitle.classList.add('fade-in');
    heroParagraph.classList.add('fade-in');
});

function toggleMusic() {
    const music = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');

    if (music.paused) {
        music.play();
        musicControl.textContent = 'Pausar';
    } else {
        music.pause();
        musicControl.textContent = 'Reproducir';
    }
}
