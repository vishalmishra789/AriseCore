/**
 * ARISECORE - CENTRAL DATA & LOGIC
 * This script handles rendering, searching, and mod details.
 */

// 1. PROJECT DATABASE
// To add more mods, just copy a block and change the details.
const projects = [
    {
        id: "falling-leaves",
        name: "Falling Leaves",
        author: "Fourmisain",
        description: "Adds a neat little particle effect to leaf blocks, making the world feel alive. Highly customizable and performance friendly.",
        downloads: "20.01M",
        followers: "5,343",
        updated: "3 months ago",
        tags: ["Fabric", "Decoration", "Client"],
        icon: "https://api.dicebear.com/7.x/identicon/svg?seed=leaves",
        isFeatured: true
    },
    {
        id: "better-leaves",
        name: "Motschen's Better Leaves",
        author: "Motschen",
        description: "Improves the appearance of leaves with high mod compatibility and performance! Works with most biomes.",
        downloads: "13.06M",
        followers: "3,716",
        updated: "2 months ago",
        tags: ["Resource Pack", "Realistic"],
        icon: "https://api.dicebear.com/7.x/identicon/svg?seed=better",
        isFeatured: false
    },
    {
        id: "leaves-be-gone",
        name: "Leaves Be Gone",
        author: "Fuzs",
        description: "Quick leaf decay from cutting down trees. Built for fast performance and mod compat! Supports Forge and Fabric.",
        downloads: "9.15M",
        followers: "1,322",
        updated: "3 months ago",
        tags: ["Server", "Fabric", "Forge"],
        icon: "https://api.dicebear.com/7.x/identicon/svg?seed=decay",
        isFeatured: false
    }
];

// 2. CORE FUNCTIONS

/**
 * Renders the list of mods to the main grid
 */
function renderProjects(filterTerm = "") {
    const container = document.getElementById('projectContainer');
    if (!container) return;

    // Filter logic
    const filtered = projects.filter(p => 
        p.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(filterTerm.toLowerCase()))
    );

    // Generate HTML
    container.innerHTML = filtered.map(p => `
        <div onclick="openDetails('${p.id}')" class="bento-card p-5 flex gap-6 items-center group cursor-pointer reveal">
            <img src="${p.icon}" class="w-16 h-16 rounded-2xl bg-slate-800 p-2 border border-white/5 shadow-inner">
            <div class="flex-grow">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-lg font-extrabold group-hover:text-blue-400 transition">${p.name}</h4>
                        <p class="text-xs text-slate-500 mb-2 font-semibold tracking-tight">by ${p.author}</p>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-sm font-bold text-white">${p.downloads}</span>
                        <span class="text-[9px] text-slate-500 uppercase font-black tracking-widest leading-none">DLs</span>
                    </div>
                </div>
                <p class="text-sm text-slate-400 mb-3 line-clamp-1 opacity-80">${p.description}</p>
                <div class="flex gap-2">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // If no results
    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center py-20 text-slate-500 font-bold uppercase tracking-widest">No projects found</div>`;
    }
}

/**
 * Populates and opens the Detail Modal
 */
window.openDetails = function(id) {
    const p = projects.find(item => item.id === id);
    if (!p) return;

    // Fill the Modal
    document.getElementById('detailTitle').innerText = p.name;
    document.getElementById('detailAuthor').innerText = `by ${p.author}`;
    document.getElementById('detailDesc').innerText = p.description;
    document.getElementById('detailDownloads').innerText = p.downloads;
    document.getElementById('detailFollowers').innerText = p.followers;
    document.getElementById('detailIcon').src = p.icon;

    // Show it
    const modal = document.getElementById('detailView');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock scroll
}

/**
 * Closes the Detail Modal
 */
window.closeDetails = function() {
    const modal = document.getElementById('detailView');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Unlock scroll
}

// 3. EVENT LISTENERS & INIT

// Search input listener
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderProjects(e.target.value);
    });
}

// Keyboard shortcuts (ESC to close modal)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeDetails();
});

// Initial Render on load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});
