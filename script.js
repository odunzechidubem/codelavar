document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Header Shadow on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "none";
        }
    });
});

// Set Current Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll to Top Functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... Your existing Menu & Scroll code ...

    /* --- TESTIMONIAL SLIDER --- */
    const track = document.querySelector('.testimonial-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    // Safety check in case the section isn't on the page (like in contact.html)
    if (track && nextBtn && prevBtn) {
        
        let currentIndex = 0;

        const updateSlidePosition = () => {
            const cards = Array.from(track.children);
            if (cards.length === 0) return;

            // 1. Get width of a single card
            const cardWidth = cards[0].getBoundingClientRect().width;
            
            // 2. Get the gap from CSS (computed style) so it's accurate
            const gapStyle = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap;
            const gap = parseFloat(gapStyle) || 0; // Default to 0 if parsing fails

            // 3. Move the track
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        const getVisibleCards = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        nextBtn.addEventListener('click', () => {
            const cards = track.children;
            const visibleCards = getVisibleCards();
            const maxIndex = cards.length - visibleCards;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Infinite loop back to start
            }
            updateSlidePosition();
        });

        prevBtn.addEventListener('click', () => {
            const cards = track.children;
            const visibleCards = getVisibleCards();
            const maxIndex = cards.length - visibleCards;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Infinite loop to end
            }
            updateSlidePosition();
        });

        // Recalculate on window resize to fix alignment
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset to start to prevent alignment glitches
            updateSlidePosition();
        });
    }
});