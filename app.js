// --- CONFIGURATION ---
const SB_URL = "https://zsdtlcyzhcfgcwqucdjd.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZHRsY3l6aGNmZ2N3cXVjZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY2MDYsImV4cCI6MjA5MDEyMjYwNn0.IgjMXn3NbVw5nt8CvrJksD4NTEr26nLGwdytUgWFLe0";

const _supabase = supabase.createClient(SB_URL, SB_KEY);

// --- PAGE ROUTING ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById('p-' + pageId).classList.add('active');
    document.getElementById('n-' + pageId).classList.add('active');
    
    if(pageId === 'mods' || pageId === 'textures') fetchAllData();
}

// --- DATA FETCHING ---
async function fetchAllData() {
    const modList = document.getElementById('modList');
    const textureList = document.getElementById('textureList');
    
    try {
        const { data: modules, error } = await _supabase
            .from('Modules')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        // Render Main Modules Page
        renderModules(modules);
        
        // Render Visuals Page (Only items marked as "Visuals")
        renderVisuals(modules.filter(m => m.category === 'Visuals'));

    } catch (err) {
        console.error("Database Connection Error:", err.message);
        modList.innerHTML = `<div class="text-red-500 text-center py-20 font-mono underline">DATA LINK SEVERED: ${err.message}</div>`;
    }
}

// --- RENDER MODULES (LIST STYLE) ---
function renderModules(data) {
    const container = document.getElementById('modList');
    if(data.length === 0) {
        container.innerHTML = `<div class="text-center text-slate-600 py-20 uppercase tracking-widest text-xs italic">No active modules found in the AriseCore Archive.</div>`;
        return;
    }

    container.innerHTML = data.map(mod => `
        <div class="cyber-card p-6 flex flex-col md:flex-row items-center gap-8 group">
            <div class="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                <img src="${mod.image_url || 'https://api.dicebear.com/7.x/shapes/svg?seed=' + mod.name}" class="w-full h-full object-cover">
            </div>
            <div class="grow text-center md:text-left">
                <div class="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h3 class="text-2xl font-bold uppercase tracking-tighter text-white group-hover:text-violet-400 transition">${mod.name}</h3>
                    <span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-500 uppercase tracking-widest">ID: ${mod.id}</span>
                </div>
                <p class="text-slate-400 text-sm max-w-2xl line-clamp-2">${mod.description || 'No database intel provided for this module.'}</p>
            </div>
            <div class="flex flex-col items-end gap-2 shrink-0">
                <span class="text-[10px] text-violet-500 font-bold uppercase tracking-widest mb-2">${mod.category} • v${mod.version}</span>
                <a href="${mod.download_url}" target="_blank" class="btn-violet flex items-center gap-2">
                    <i class="fa-solid fa-download"></i> DOWNLOAD
                </a>
            </div>
        </div>
    `).join('');
}

// --- RENDER VISUALS (GRID STYLE) ---
function renderVisuals(data) {
    const container = document.getElementById('textureList');
    if(data.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center text-slate-600 py-20 uppercase tracking-widest text-xs italic">Awaiting Visual Uplinks...</div>`;
        return;
    }

    container.innerHTML = data.map(mod => `
        <div class="cyber-card group">
            <div class="aspect-video bg-white/5 overflow-hidden">
                <img src="${mod.image_url || 'https://placehold.co/600x400/1e1b4b/white?text=No+Preview'}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h4 class="text-xl font-bold uppercase">${mod.name}</h4>
                    <span class="text-[9px] border border-violet-500/30 text-violet-400 px-2 py-0.5 rounded uppercase font-bold">${mod.version}</span>
                </div>
                <p class="text-slate-500 text-xs mb-6 h-12 line-clamp-3 leading-relaxed">${mod.description}</p>
                <a href="${mod.download_url}" target="_blank" class="w-full btn-violet block text-center">GET PACK</a>
            </div>
        </div>
    `).join('');
}

// --- SEARCH LOGIC ---
document.getElementById('moduleSearch')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#modList .cyber-card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'flex' : 'none';
    });
});

// Initialize
window.onload = () => {
    // Check if we need to load data immediately
    if(document.getElementById('p-mods').classList.contains('active')) fetchAllData();
};
