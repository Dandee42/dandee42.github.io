document.addEventListener('DOMContentLoaded', function() {
    const alertBanner = document.querySelector('.alert-banner');
    if (!alertBanner) return;

    const root = document.documentElement;

    if (localStorage.getItem('alertDismissed') === 'true') {
      alertBanner.style.display = 'none';
      root.style.setProperty('--alert-height', '0px');
      return;
    }

    // Keep --alert-height in sync when the text wraps (resize, web fonts loading)
    new ResizeObserver(function() {
      root.style.setProperty('--alert-height', alertBanner.offsetHeight + 'px');
    }).observe(alertBanner);

    const closeButtons = document.querySelectorAll('.alert-close');
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        alertBanner.style.display = 'none';
        localStorage.setItem('alertDismissed', 'true');
      });
    });
});