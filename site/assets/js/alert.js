document.addEventListener('DOMContentLoaded', function() {
    const alertBanner = document.querySelector('.alert-banner');
    if (!alertBanner) return;

    if (localStorage.getItem('alertDismissed') === 'true') {
      alertBanner.style.display = 'none';
      return;
    }

    const closeButtons = document.querySelectorAll('.alert-close');
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        alertBanner.style.display = 'none';
        localStorage.setItem('alertDismissed', 'true');
      });
    });
});