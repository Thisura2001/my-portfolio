const menuBtn = document.querySelector('.menu-btn');
const navToggle = document.querySelector('.navbar');
const navContainer = document.querySelector('header');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navToggle.classList.toggle('active');
    navContainer.classList.toggle('active');
});
window.addEventListener('scroll', function() {
    var scrollingPage = document.querySelector('.scrolling-page');
    var scrollPosition = window.scrollY;

    // Add 'open' class when the user scrolls to reveal the scrolling page
    if (scrollPosition > 100) { // Adjust this value based on your needs
        scrollingPage.classList.add('open');
    } else {
        scrollingPage.classList.remove('open');
    }
});
