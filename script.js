document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. HERO SLIDER LOGIC
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    if (slides.length > 0) {
        let current = 0;
        let interval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('opacity-100', i === index);
                slide.classList.toggle('opacity-0', i !== index);
                slide.classList.toggle('active', i === index);
                slide.style.pointerEvents = i === index ? 'auto' : 'none';
            });
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            showSlide(current);
        }

        function prevSlide() {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        }

        function startAutoSlide() {
            interval = setInterval(nextSlide, 3500);
        }

        function resetAutoSlide() {
            clearInterval(interval);
            startAutoSlide();
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        showSlide(current);
        startAutoSlide();
    }


    /* =========================================
       2. MOBILE MENU LOGIC (FIXED)
       ========================================= */
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link'); // Ensure class matches HTML

    if (menuBtn && mobileMenu && closeMenu) {
        // Open
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        // Close Function
        const closeMenuFn = () => {
            mobileMenu.classList.add('translate-x-full');
        };

        // Close on X button
        closeMenu.addEventListener('click', closeMenuFn);

        // Close when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenuFn);
        });
    }


    /* =========================================
       3. MARQUEE ANIMATION
       ========================================= */
    const marquee = document.querySelector('.marquee-single');

    if (marquee) {
        let x = 0;
        let baseSpeed = -0.5;
        let speed = baseSpeed;
        let targetSpeed = baseSpeed;
        let lastScrollY = window.scrollY;
        let scrollTimeout;

        function animateMarquee() {
            speed += (targetSpeed - speed) * 0.1;
            x += speed;

            const width = marquee.scrollWidth / 2;

            if (x <= -width) x = 0;
            if (x > 0) x = -width;

            marquee.style.transform = `translateX(${x}px)`;
            requestAnimationFrame(animateMarquee);
        }

        window.addEventListener('scroll', () => {
            const delta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            let velocity = delta * 0.2;

            if (velocity > 8) velocity = 8;
            if (velocity < -8) velocity = -8;

            targetSpeed = baseSpeed + velocity;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                targetSpeed = baseSpeed;
            }, 100);
        });

        animateMarquee();
    }


    /* =========================================
       4. SCROLL SPY (Nav Highlighting)
       ========================================= */
    const links = document.querySelectorAll('.nav-link'); // Ensure class matches HTML
    const sections = document.querySelectorAll('section[id]');

    if (links.length > 0 && sections.length > 0) {
        function clearActive() {
            links.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-gray-400');
            });
        }

        function setActiveLinkByHref(href) {
            clearActive();
            // Handle both full url and hash
            const link = document.querySelector(`.nav-link[href="${href}"]`) || 
                         document.querySelector(`.nav-link[href*="${href}"]`);
            
            if (link) {
                link.classList.add('text-white');
                link.classList.remove('text-gray-400');
            }
        }

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 150;

            if (scrollPos < 300) {
                setActiveLinkByHref('#home'); // Assuming top section is #home
                return;
            }

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    setActiveLinkByHref(`#${id}`);
                }
            });
        });
    }


    /* =========================================
       5. CONTACT FORM (SOPHISTICATED)
       ========================================= */
    const form = document.getElementById("contactForm");
    const errorMsg = document.getElementById("formError");
    const submitBtn = document.getElementById("submitBtn");
    const successCard = document.getElementById("successCard");
    const textarea = document.getElementById('message');

    // Auto-resize Textarea
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    if (form && submitBtn && errorMsg) {
        const btnText = submitBtn.querySelector(".button-text");
        const inputs = form.querySelectorAll("input, select, textarea");

        // Input Clean-up Logic
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                input.classList.remove("border-red-500");
                errorMsg.classList.add("hidden");
            });
            // Specific logic for Select dropdowns color
            if (input.tagName === 'SELECT') {
                input.addEventListener("change", function() {
                    this.style.color = "black";
                    this.classList.remove("border-red-500");
                });
            }
        });

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("border-red-500");
                } else {
                    field.classList.remove("border-red-500");
                }
            });

            if (!isValid) {
                errorMsg.classList.remove("hidden");
                return;
            }

            // --- SUCCESS SEQUENCE --- //

            // 1. Hide Errors
            errorMsg.classList.add("hidden");

            // 2. Button Loading State
            submitBtn.disabled = true;
            const originalBtnContent = btnText.innerHTML;
            btnText.innerHTML = 'Processing...';

            // 3. Simulate API Call (1.5s delay)
            // 3. SEND EMAIL USING EMAILJS
emailjs.send(
    "service_a4rgi8x",          // Service ID
    "template_nn5a6za",         // Template ID
    {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        company: document.getElementById("company").value,
        plan: document.getElementById("plan").value,
        message: document.getElementById("message").value,
    }
).then(() => {

    // ✅ SUCCESS UI
    btnText.innerHTML = "Request Sent ✔";
    submitBtn.classList.remove("bg-black", "hover:bg-gray-900");
    submitBtn.classList.add("bg-green-600", "hover:bg-green-700");

    if (successCard) {
        successCard.classList.remove("hidden");
        setTimeout(() => {
            successCard.classList.remove("opacity-0", "translate-y-4");
        }, 50);
    }

    form.reset();
    form.querySelectorAll("select").forEach(s => s.style.color = "");

    setTimeout(() => {
        submitBtn.disabled = false;
        btnText.innerHTML = originalBtnContent;
        submitBtn.classList.add("bg-black", "hover:bg-gray-900");
        submitBtn.classList.remove("bg-green-600", "hover:bg-green-700");

        if (successCard) {
            successCard.classList.add("opacity-0", "translate-y-4");
            setTimeout(() => successCard.classList.add("hidden"), 700);
        }
    }, 5000);

}).catch((error) => {
    console.error("EmailJS Error:", error);
    errorMsg.classList.remove("hidden");
    submitBtn.disabled = false;
    btnText.innerHTML = originalBtnContent;
});

            
        });
    }

});