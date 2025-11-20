try {
    // Wait for the entire page to load before running this script
    document.addEventListener('DOMContentLoaded', function() {

        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Check if the required HTML elements exist on the page
        if (menuToggle && mobileMenu) {
            const navLinks = mobileMenu.querySelectorAll('a');

            // Add a click event listener to the hamburger icon
            menuToggle.addEventListener('click', function() {
                // Toggle the 'active' class on the menu div
                mobileMenu.classList.toggle('active');

                // Change the icon from bars to 'X' and vice versa
                const icon = menuToggle.querySelector('i');
                if (mobileMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times'; // 'X' icon
                } else {
                    icon.className = 'fas fa-bars'; // Hamburger icon
                }
            });

            // Close the menu when a link inside it is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                });
            });
        }
    });
} catch (error) {
    console.error("An error occurred in the mobile menu script:", error);
}
