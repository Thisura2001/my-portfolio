
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
