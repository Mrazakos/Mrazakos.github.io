

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else{
            entry.target.classList.remove('show');
        }
    });
}, {
    // Optional: Customize the root margin (adjust as needed)
    rootMargin: '10px',
    // Optional: Set a threshold for intersection (0.5 means 50% visibility)
    threshold: 0.2,
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));