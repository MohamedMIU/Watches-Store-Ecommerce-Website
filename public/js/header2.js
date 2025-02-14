const bar = document.getElementById('bar');
const nav = document.querySelector('.navbar');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');

    })
}

const close = document.querySelector('.close');
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');

    })
}