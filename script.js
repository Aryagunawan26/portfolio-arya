document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen Fade Out
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        loading.style.opacity = '0';
        setTimeout(() => loading.style.display = 'none', 500);
    }, 2000);

    // 2. Navbar & Scroll Progress
    const header = document.getElementById('header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar glassmorphism
        if(window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        // Scroll Progress Bar
        const scrollPx = document.documentElement.scrollTop;
        const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;

        // Back to top button
        if(window.scrollY > 500) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 4. Typing Effect
    const words = ["IT Support", "Front-End Developer", "Data Science Enthusiast", "Web Developer"];
    let i = 0, j = 0;
    let isDeleting = false;
    const typingText = document.querySelector(".typing-text");
    
    function typeEffect() {
        const currentWord = words[i];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, j - 1);
            j--;
        } else {
            typingText.textContent = currentWord.substring(0, j + 1);
            j++;
        }

        let speed = isDeleting ? 100 : 200;

        if (!isDeleting && j === currentWord.length) {
            speed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            speed = 500; // Pause before new word
        }
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 5. Scroll Reveal & Skill Progress Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress-bar');
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger reveal animation
                entry.target.classList.add('active');
                
                // Trigger Progress bar
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.progress-bar');
                    bar.style.width = bar.getAttribute('data-width');
                }

                // Trigger Counter
                if (entry.target.classList.contains('stat-item') && !entry.target.classList.contains('counted')) {
                    const counter = entry.target.querySelector('.counter');
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if(current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if(filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => project.style.display = 'none', 400);
                }
            });
        });
    });

    // 7. Contact Form Basic Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally send data to a server
        alert('Pesan berhasil dikirim! (Ini adalah demo UI)');
        contactForm.reset();
    });
});

// Modal Functions untuk Sertifikat
function openModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("imgModal");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
}

/* ==========================================
   TOMBOL SHOW MORE PROJECTS
   ========================================== */
const showMoreBtn = document.getElementById('show-more-btn');
const hiddenProjects = document.querySelectorAll('.hidden-project');
const showMoreContainer = document.getElementById('show-more-container');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
        // Tampilkan semua proyek yang tadinya disembunyikan
        hiddenProjects.forEach(project => {
            project.classList.remove('hidden-project');
            
            // Panggil ulang efek muncul perlahan (fade-up)
            setTimeout(() => {
                project.classList.add('active');
            }, 50);
        });
        
        // Sembunyikan tombol "Show More" karena semua proyek sudah tampil
        showMoreContainer.style.display = 'none';
    });
}