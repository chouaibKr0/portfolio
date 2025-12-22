// ================================
// Portfolio JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScroll();
    initNeuralNetwork();
});

// ================================
// Navigation
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// ================================
// Typing Effect
// ================================
function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const roles = [
        'Software Engineer',
        'AI/ML Developer',
        'Computer Vision Researcher',
        'Backend Developer',
        'Machine Learning Engineer',
        'Quantum Computing Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// ================================
// Scroll Animations
// ================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .cert-item, .highlight-item, .contact-item'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ================================
// Counter Animation
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Neural Network Background Animation
// ================================
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas || !canvas.getContext) return;

    // Create actual canvas element
    const canvasEl = document.createElement('canvas');
    canvasEl.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
    canvas.appendChild(canvasEl);

    const ctx = canvasEl.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvasEl.width = window.innerWidth;
        canvasEl.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor((canvasEl.width * canvasEl.height) / 20000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvasEl.width,
                y: Math.random() * canvasEl.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });

        // Draw and update particles
        particles.forEach(p => {
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
            ctx.fill();

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > canvasEl.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvasEl.height) p.vy *= -1;
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    // Initialize
    resize();
    drawParticles();

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 200);
    });

    // Pause animation when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            drawParticles();
        }
    });
}

// ================================
// Utility Functions
// ================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
}, 16));

// Console Easter Egg
console.log(`
%c👋 Hey there, fellow developer!
%c
Looking at my code? Nice!
Feel free to reach out if you want to collaborate.

📧 karballac@gmail.com
💼 linkedin.com/in/chouaib-karballa-490992215
🐙 github.com/chouaibKr0

`, 
'color: #6366f1; font-size: 18px; font-weight: bold;',
'color: #94a3b8; font-size: 12px;'
);
