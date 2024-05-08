
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');

    menuBtn.addEventListener('click', function () {
        // Toggle the visibility of the navbar
        navbar.style.display = navbar.style.display === 'block' ? 'none' : 'block';
    });
    // Optional: close the navbar when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!navbar.contains(event.target) && event.target !== menuBtn) {
            navbar.style.display = 'none';
        }
    });
});
//typing animation
// document.addEventListener("DOMContentLoaded", function() {
//     const typed = new Typed('.typing', {
//         strings: ["Software Engineer..", "Full Stack Developer..", "UI/UX Designer..", "Web Developer.."],
//         typeSpeed: 60,
//         backSpeed: 30,
//         backDelay: 600,
//         loop: true
//     });
// });

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
}, { rootMargin: "0px 0px -100px 0px" });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


