document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-header, .festival-card');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "1rem 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "1.5rem 0";
        }
    });

    // Map Data & Interaction
    const festivalData = {
        'uttarayan': {
            title: 'Uttarayan',
            region: 'Gujarat',
            desc: 'The sky fills with millions of colorful kites as people compete in friendly battles from their rooftops. "Kai Po Che!" echoes through the air.',
            icon: '🪁'
        },
        'lohri': {
            title: 'Lohri',
            region: 'Punjab',
            desc: 'A vibrant celebration of fire and harvest. People dance Bhangra around bonfires, offering puffed rice, popcorn, and sesame seeds to the fire god.',
            icon: '🔥'
        },
        'pongal': {
            title: 'Pongal',
            region: 'Tamil Nadu',
            desc: 'A four-day harvest festival where "Pongal" (rice and milk) is cooked in earthen pots until it overflows, symbolizing prosperity and abundance.',
            icon: '🌾'
        },
        'bihu': {
            title: 'Bihu',
            region: 'Assam',
            desc: 'Magh Bihu marks the end of the harvesting season. It involves community feasts, traditional Bihu dance, and building temporary huts called Meji.',
            icon: '🥁'
        },
        'west-bengal': {
            title: 'Poush Sankranti',
            region: 'West Bengal',
            desc: 'Known for baking traditional date palm jaggery sweets called "Pithe" and "Puli". It marks the harvest of paddy and worship of Goddess Lakshmi.',
            icon: '🍬'
        },
        'maharashtra': {
            title: 'Makar Sankranti',
            region: 'Maharashtra',
            desc: 'People exchange multi-colored sweets made of sesame seeds and jaggery called "Tilgul" while saying "Tilgul ghyaa, god god bola" (Take this sweet, talk sweetly).',
            icon: '🥥'
        }
    };

    const mapPins = document.querySelectorAll('.map-pin-group');
    const dynamicContent = document.getElementById('dynamic-content');
    const infoPanel = document.getElementById('info-panel');

    mapPins.forEach(pin => {
        pin.addEventListener('click', function () {
            // Remove active class from all
            mapPins.forEach(p => p.querySelector('.map-pin').classList.remove('active'));

            // Add active class to clicked
            this.querySelector('.map-pin').classList.add('active');

            const festivalKey = this.getAttribute('data-festival');
            const data = festivalData[festivalKey];

            if (data) {
                // Animate content change
                dynamicContent.style.opacity = 0;
                setTimeout(() => {
                    dynamicContent.innerHTML = `
                        <div class="info-card-animate">
                            <h4 style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-brand-magenta);">${data.title}</h4>
                            <span class="region-badge" style="background:var(--color-accent-pale-green); padding: 0.25rem 0.75rem; border-radius: 15px; font-weight:600; font-size: 0.85rem; display:inline-block; margin-bottom:1rem;">${data.region}</span>
                            <div style="font-size: 3rem; margin-bottom: 1rem;">${data.icon}</div>
                            <p style="font-size: 1.1rem; line-height: 1.6;">${data.desc}</p>
                        </div>
                    `;
                    dynamicContent.style.opacity = 1;
                }, 300);
            }
        });
    });

    // Auto-select first pin
    if (mapPins.length > 0) {
        // Trigger click on first one after a delay
        setTimeout(() => mapPins[0].dispatchEvent(new Event('click')), 1000);
    }

    console.log("Website Loaded and Script Running");
});
