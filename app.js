/**
 * AriseCore | Nexus Logic Engine
 * Version: 2.1.0 (Cyber-Quartz Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial System Boot Log
    console.log(
        "%c ARISECORE %c SYSTEM OPERATIONAL %c",
        "background: #8b5cf6; color: #fff; font-weight: bold; padding: 2px 8px; border-radius: 4px 0 0 4px;",
        "background: #1e1b4b; color: #8b5cf6; font-weight: bold; padding: 2px 8px; border-radius: 0 4px 4px 0;",
        "background: transparent;"
    );

    // Module Search Logic
    const searchInput = document.getElementById('moduleSearch');
    const moduleContainer = document.querySelector('#p-mods .max-w-7xl');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.cyber-card');

            cards.forEach(card => {
                // Only filter cards within the Modules page
                if (card.closest('#p-mods')) {
                    const title = card.querySelector('h3, h4')?.innerText.toLowerCase() || "";
                    const desc = card.querySelector('p')?.innerText.toLowerCase() || "";
                    
                    if (title.includes(term) || desc.includes(term)) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                }
            });
        });
    }
});

/**
 * Handles Single Page Application (SPA) Routing
 * @param {string} id - The ID of the section to display
 */
function showPage(id) {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Clear Active States
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 2. Activate Target Page
    const targetPage = document.getElementById('p-' + id);
    const targetNav = document.getElementById('n-' + id);

    if (targetPage) {
        targetPage.style.display = 'block';
        // Small timeout to allow the fade-in animation to trigger correctly
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 10);
    }

    if (targetNav) {
        targetNav.classList.add('active');
    }

    // 3. Telemetry Log
    console.log(`%c[SYSTEM]%c Navigating to Nexus Cluster: ${id.toUpperCase()}`, "color: #8b5cf6; font-weight: bold;", "color: #94a3b8;");

    // 4. Smooth reset to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
