window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

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