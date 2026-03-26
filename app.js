/**
 * AriseCore | Nexus Logic Engine 
 * Supabase Integration v1.0
 */

// 1. Initialize Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = lib.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    console.log("%c ARISECORE %c CONNECTED TO NEXUS %c", 
        "background: #8b5cf6; color: #fff; font-weight: bold; padding: 2px 8px; border-radius: 4px 0 0 4px;", 
        "background: #1e1b4b; color: #8b5cf6; font-weight: bold; padding: 2px 8px; border-radius: 0 4px 4px 0;", 
        "background: transparent;");

    // Load initial data
    loadContent();
});

/**
 * Fetch Modules and Textures from Supabase
 */
async function loadContent() {
    // Fetch Modules
    const { data: modules, error: modError } = await supabase.from('modules').select('*');
    if (modules) renderModules(modules);

    // Fetch Texture Packs
    const { data: textures, error: texError } = await supabase.from('textures').select('*');
    if (textures) renderTextures(textures);
}

function renderModules(modules) {
    const modList = document.getElementById('modList');
    if (!modList) return;
    
    modList.innerHTML = ''; // Clear placeholders

    modules.forEach(mod => {
        modList.innerHTML += `
            <div class="cyber-card p-10 flex flex-col md:flex-row gap-10 items-center mb-6" data-name="${mod.name}">
                <div class="w-24 h-24 border-2 border-violet-500 flex items-center justify-center text-4xl text-violet-500 overflow-hidden">
                    <img src="${mod.image_url || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + mod.name}" class="w-full h-full object-cover">
                </div>
                <div>
                    <h3 class="text-3xl font-bold uppercase">${mod.name}</h3>
                    <p class="text-violet-300 text-lg italic mb-2">v${mod.version || '1.0.0'}</p>
                    <p class="text-slate-400 max-w-2xl">${mod.description}</p>
                </div>
                <a href="${mod.download_url}" target="_blank" class="btn-violet ml-auto text-center">INSTALL</a>
            </div>
        `;
    });
}

function renderTextures(textures) {
    const texList = document.querySelector('#p-textures .grid');
    if (!texList) return;

    texList.innerHTML = '';
    textures.forEach(tex => {
        texList.innerHTML += `
            <div class="cyber-card p-6 flex gap-4">
                <img src="${tex.image_url}" class="w-16 h-16 bg-white/5 rounded-xl object-cover">
                <div>
                    <h4 class="font-bold text-violet-400">${tex.name}</h4>
                    <p class="text-xs text-slate-500">${tex.description}</p>
                    <a href="${tex.download_url}" class="text-violet-500 text-[10px] mt-2 block uppercase font-bold tracking-widest hover:underline">Download</a>
                </div>
            </div>
        `;
    });
}

/**
 * SPA Navigation
 */
function showPage(id) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    
    const target = document.getElementById('p-' + id);
    const nav = document.getElementById('n-' + id);
    
    if(target) target.classList.add('active');
    if(nav) nav.classList.add('active');
    
    // Refresh content when entering Modules or Textures
    if (id === 'mods' || id === 'textures') loadContent();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
