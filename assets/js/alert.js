document.addEventListener('DOMContentLoaded', function() {
    // To hide alert banner by clicking on the cross button
    const closeButtons = document.querySelectorAll('.alert-close');
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const alertBanner = button.closest('.alert-banner');
        alertBanner.style.display = 'none';
      });
    });
});