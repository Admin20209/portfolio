// script.js

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Typewriter effect
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const cursorSpan = document.querySelector('.cursor');
    const words = {
        en: ['Mechatronics Student', 'Competitive Swimmer', 'Theater Enthusiast', 'Tech Lover', 'Wattpad Writer'],
        nl: ['Student Mechatronica', 'Competitiezwemmer', 'Theaterliefhebber', 'Tech Liefhebber', 'Wattpad Schrijver']
    };
    let currentLang = localStorage.getItem('lang') || 'en';
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 200;
    let timeoutId = null;

    function type() {
        const wordList = words[currentLang];
        const currentWord = wordList[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);

        typedTextSpan.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            timeoutId = setTimeout(type, typeDelay);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            timeoutId = setTimeout(type, typeDelay / 2);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % wordList.length;
            }
            timeoutId = setTimeout(type, 1200);
        }
    }

    window.addEventListener('load', type);

    window.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.lang;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (timeoutId) clearTimeout(timeoutId);
        type();
    });
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    let currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'nl' : 'en';
        localStorage.setItem('lang', currentLang);
        setLanguage(currentLang);
    });

    function setLanguage(lang) {
        langToggle.textContent = lang === 'en' ? 'NL' : 'EN';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = translations[lang]?.[key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const translation = translations[lang]?.[key];
            if (translation) {
                el.placeholder = translation;
            }
        });

        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
});

// Translations (all em-dashes replaced with normal hyphens)
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About Me',
        'nav-projects': 'Projects',
        'nav-education': 'Education',
        'nav-contact': 'Contact',
        // Home
        'hero-greeting': "Hi, I'm Ebe",
        'hero-prefix': "I'm a",
        'hero-btn': 'Explore my world',
        // About
        'about-title': 'About Me',
        'about-subtitle': 'Mechatronics student, competitive swimmer, theater enthusiast, Wattpad writer',
        'about-p1': "Hi, I'm Ebe van den Hoorn, a mechatronics student at TISM with a passion for technology, creativity, and human connection. I love building things that matter - whether it's a robot, a stage character, or a personal best in the pool.",
        'about-p2': "I'm a curious and dedicated person who enjoys learning new skills and taking on challenges. I believe in clear communication, teamwork, and always giving my best.",
        'about-wattpad': "I also write fiction on Wattpad under the pen name ",
        'wattpad-link': "Lysander Nightshade",
        'about-interests': 'Interests',
        'interest-drama': '🎭 Word and drama lab',
        'interest-music': '🎵 Music',
        'interest-swim': '🏊‍♂️ Swimming (competitive)',
        'skills-title': 'Skills & qualities',
        'skill-ict': 'ICT',
        'skill-communicate': 'Clear and effective communication',
        'skill-feedback': 'Giving and receiving feedback',
        'skill-conflict': 'Conflict resolution',
        'skill-respect': 'Respect for others',
        'skill-deadlines': 'Meeting deadlines',
        'skill-responsibility': 'Taking responsibility',
        'skill-initiative': 'Showing initiative',
        'skill-perseverance': 'Perseverance',
        'languages-title': 'Languages',
        'lang-nl': 'Dutch – Fluent',
        'lang-en': 'English – Fluent',
        // Projects
        'projects-title': 'Projects',
        'projects-subtitle': 'Things I’ve built and worked on',
        'project-greenpower': 'Greenpower Challenge Benelux',
        'project-greenpower-desc': 'With my school team, we design, build, and race an electric kit car. I work on the mechatronics: electrical system, motor control, and data logging.',
        'project-swimming': 'Swimming volunteer',
        'project-swimming-desc': 'Teaching swimming lessons to children at De Meerkoet Bree. Helping kids gain confidence in the water.',
        'project-kannet': 'Kannet sports camp',
        'project-kannet-desc': 'Volunteer at a sports camp for children with physical and mental disabilities. Organizing activities and ensuring everyone has a great time.',
        'project-frigera': 'Week worker at Frigera',
        'project-frigera-desc': 'Helped with packing boxes and loading pallets during summer break.',
        // Education
        'education-title': 'Education',
        'education-subtitle': 'My learning journey',
        'edu-vuurvogel': 'De Vuurvogel',
        'edu-vuurvogel-desc': 'Nursery and primary school, Bree',
        'edu-kindsheid': 'Kindsheid Jesu',
        'edu-kindsheid-desc': 'Secondary education, Hasselt – STEM techniques, art & creation, media & welfare',
        'edu-tism': 'TISM – Mechatronics',
        'edu-tism-desc': 'Secondary education, Bree – Focus on mechatronics: mechanics, electronics, and programming.',
        // Contact
        'contact-title': 'Contact',
        'contact-subtitle': "Let's connect",
        'contact-email': 'ebe.vandenhoorn@protonmail.com',
        'contact-phone': '+32 468 06 85 06',
        'contact-address': 'Nieuwsadpoort 53, 3960 Bree',
        'contact-name-placeholder': 'Your Name',
        'contact-email-placeholder': 'Your Email',
        'contact-message-placeholder': 'Your Message',
        'contact-send': 'Send Message',
        // Footer
        'footer-text': '2026. Built with purpose.'
    },
    nl: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'Over Mij',
        'nav-projects': 'Projecten',
        'nav-education': 'Opleiding',
        'nav-contact': 'Contact',
        // Home
        'hero-greeting': 'Hoi, ik ben Ebe',
        'hero-prefix': 'Ik ben een',
        'hero-btn': 'Ontdek mijn wereld',
        // About
        'about-title': 'Over Mij',
        'about-subtitle': 'Student mechatronica, competitiezwemmer, theaterliefhebber, Wattpad schrijver',
        'about-p1': "Hoi, ik ben Ebe van den Hoorn, mechatronica-student aan TISM met een passie voor technologie, creativiteit en menselijke connectie. Ik hou ervan om dingen te bouwen die ertoe doen - of het nu een robot, een personage op het podium of een persoonlijk record in het zwembad is.",
        'about-p2': "Ik ben een nieuwsgierig en toegewijd persoon die graag nieuwe vaardigheden leert en uitdagingen aangaat. Ik geloof in duidelijke communicatie, teamwork en altijd mijn best doen.",
        'about-wattpad': "Ik schrijf ook fictie op Wattpad onder de schuilnaam ",
        'wattpad-link': "Lysander Nightshade",
        'about-interests': 'Interesses',
        'interest-drama': '🎭 Woord en dramalab',
        'interest-music': '🎵 Muziek',
        'interest-swim': '🏊‍♂️ Zwemmen (competitie)',
        'skills-title': 'Vaardigheden & kwaliteiten',
        'skill-ict': 'ICT',
        'skill-communicate': 'Duidelijk en effectief communiceren',
        'skill-feedback': 'Feedback geven en ontvangen',
        'skill-conflict': 'Conflictoplossend denken',
        'skill-respect': 'Respect voor anderen',
        'skill-deadlines': 'Deadlines halen',
        'skill-responsibility': 'Verantwoordelijkheid nemen',
        'skill-initiative': 'Initiatief tonen',
        'skill-perseverance': 'Doorzettingsvermogen',
        'languages-title': 'Talen',
        'lang-nl': 'Nederlands – Vloeiend',
        'lang-en': 'Engels – Vloeiend',
        // Projects
        'projects-title': 'Projecten',
        'projects-subtitle': 'Dingen die ik heb gebouwd en gedaan',
        'project-greenpower': 'Greenpower Challenge Benelux',
        'project-greenpower-desc': 'Met mijn schoolteam ontwerpen, bouwen en racen we een elektrische kit car. Ik werk aan de mechatronica: elektrisch systeem, motorregeling en datalogging.',
        'project-swimming': 'Vrijwilliger zwemles',
        'project-swimming-desc': 'Zwemlessen geven aan kinderen bij De Meerkoet Bree. Kinderen helpen vertrouwen te krijgen in het water.',
        'project-kannet': 'Kannet sportkamp',
        'project-kannet-desc': 'Vrijwilliger bij een sportkamp voor kinderen met een fysieke en/of mentale beperking. Activiteiten organiseren en zorgen dat iedereen een geweldige tijd heeft.',
        'project-frigera': 'Weekmedewerker Frigera',
        'project-frigera-desc': 'Geholpen met het inpakken van dozen en laden van pallets tijdens de zomervakantie.',
        // Education
        'education-title': 'Opleiding',
        'education-subtitle': 'Mijn leertraject',
        'edu-vuurvogel': 'De Vuurvogel',
        'edu-vuurvogel-desc': 'Kleuter- en basisschool, Bree',
        'edu-kindsheid': 'Kindsheid Jesu',
        'edu-kindsheid-desc': 'Secundair onderwijs, Hasselt – STEM-technieken, kunst & creatie, media & welzijn',
        'edu-tism': 'TISM – Mechatronica',
        'edu-tism-desc': 'Secundair onderwijs, Bree – Focus op mechatronica: mechanica, elektronica en programmeren.',
        // Contact
        'contact-title': 'Contact',
        'contact-subtitle': 'Laten we verbinden',
        'contact-email': 'ebe.vandenhoorn@protonmail.com',
        'contact-phone': '+32 468 06 85 06',
        'contact-address': 'Nieuwsadpoort 53, 3960 Bree',
        'contact-name-placeholder': 'Jouw naam',
        'contact-email-placeholder': 'Jouw e-mail',
        'contact-message-placeholder': 'Jouw bericht',
        'contact-send': 'Verstuur bericht',
        // Footer
        'footer-text': '2026. Gebouwd met doel.'
    }
};