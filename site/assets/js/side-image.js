document.addEventListener('scroll', function() {
    const contentSections = document.querySelectorAll('.start-side-image');
    contentSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add('visible');
        }
    });
});