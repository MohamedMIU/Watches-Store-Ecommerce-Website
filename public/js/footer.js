
   document.addEventListener('DOMContentLoaded', function () {
    function handleToggle() {
        var toggles = document.querySelectorAll('.footer-column .toggle');
        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var list = this.nextElementSibling;
                list.classList.toggle('show'); // Toggle 'show' class instead of inline style
            });
        });
    }

    function applyToggleForSmallScreens() {
        var mediaQuery = window.matchMedia('(max-width: 1350px)');
        var footerColumns = document.querySelectorAll('.footer-column ul');

        if (mediaQuery.matches) {
            footerColumns.forEach(function (ul) {
                ul.classList.remove('show'); // Ensure lists are hidden by default on small screens
            });
            handleToggle(); // Add toggle functionality
        } else {
            footerColumns.forEach(function (ul) {
                ul.classList.add('show'); // Ensure lists are shown by default on larger screens
            });
        }
    }

    // Apply toggle on load and on resize
    applyToggleForSmallScreens();
    window.addEventListener('resize', applyToggleForSmallScreens);
});