document.addEventListener("DOMContentLoaded", () => {
    if (typeof SPOT_DATA === "undefined") { console.error("SPOT_DATA bulunamadı!"); return; }
    renderTheme(); renderHero(); renderVenueSummary(); renderOverview(); renderWhyVisit(); renderMustSee(); renderTransportation(); renderWhereToStay(); renderWhereToEat(); setupInteractions();
});
function renderTheme() { document.body.className = "bg-slate-50 text-slate-800 font-['Inter',sans-serif]"; }
function renderHero() {
    document.getElementById("hero-cover").src = SPOT_DATA.hero.coverImage;
    document.getElementById("hero-category").textContent = SPOT_DATA.hero.category;
    document.getElementById("hero-badge").textContent = SPOT_DATA.hero.badge;
    document.getElementById("hero-title").textContent = SPOT_DATA.hero.title;
    document.getElementById("hero-subtitle").textContent = SPOT_DATA.hero.subtitle;
    document.getElementById("hero-stats").innerHTML = SPOT_DATA.hero.stats.map(s => `<div><p class="text-xs uppercase tracking-wider text-slate-300">${s.label}</p><p class="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] mt-1">${s.value}</p></div>`).join("");
}
function renderVenueSummary() {
    document.getElementById("venue-summary-box").innerHTML = `<div class="relative z-10 space-y-4"><span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white">${SPOT_DATA.summary.typeTitle}</span><p class="text-lg sm:text-xl font-medium leading-relaxed">${SPOT_DATA.summary.description}</p></div>`;
}
function renderOverview() {
    document.getElementById("overview-paragraphs").innerHTML = SPOT_DATA.overview.paragraphs.map(p => `<p>${p}</p>`).join("");
    document.getElementById("visitor-notes-list").innerHTML = SPOT_DATA.overview.visitorNotes.map(n => `<li class="flex items-start space-x-3"><i class="fa-solid fa-circle-check text-emerald-600 mt-1"></i><span><strong>${n.title}:</strong> ${n.description}</span></li>`).join("");
}
function renderWhyVisit() {
    document.getElementById("why-visit-cards").innerHTML = SPOT_DATA.whyVisit.map(c => `<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover space-y-4"><div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center text-xl"><i class="${c.icon}"></i></div><h3 class="text-xl font-['Playfair_Display',serif] font-bold text-slate-900">${c.title}</h3><p class="text-slate-600 text-sm leading-relaxed">${c.description}</p></div>`).join("");
}
function renderMustSee() {
    document.getElementById("must-see-items").innerHTML = SPOT_DATA.mustSee.map(i => `<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover flex flex-col"><img src="${i.image}" alt="${i.title}" class="w-full h-40 object-cover"><div class="p-5 flex-1 flex flex-col justify-between space-y-3"><h3 class="text-lg font-['Playfair_Display',serif] font-bold text-slate-900">${i.title}</h3><p class="text-slate-600 text-sm">${i.description}</p></div></div>`).join("");
}
function renderTransportation() {
    document.getElementById("transportation-methods").innerHTML = SPOT_DATA.transportation.methods.map(m => `<div class="flex items-start space-x-3"><div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5"><i class="${m.icon}"></i></div><div><strong class="text-slate-900">${m.title}:</strong><p class="text-sm mt-0.5">${m.detail}</p></div></div>`).join("");
    document.getElementById("transportation-tip").innerHTML = `<i class="fa-solid fa-lightbulb mr-2"></i><strong>İpucu:</strong> ${SPOT_DATA.transportation.tip}`;
    const mapBtn = document.getElementById("map-direction-btn");
    mapBtn.href = SPOT_DATA.transportation.mapUrl; mapBtn.target = "_blank"; mapBtn.rel = "noopener noreferrer";
}
function renderWhereToStay() {
    document.getElementById("hotel-list").innerHTML = SPOT_DATA.whereToStay.map(h => `<div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between space-x-4"><div class="space-y-1"><h3 class="font-bold text-slate-900">${h.name}</h3><p class="text-xs text-slate-500">${h.type} &bull; <span class="text-amber-600 font-semibold"><i class="fa-solid fa-star mr-1"></i>${h.rating}</span></p></div><a href="${h.link}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors shrink-0">İncele <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i></a></div>`).join("");
}
function renderWhereToEat() {
    document.getElementById("restaurant-list").innerHTML = SPOT_DATA.whereToEat.map(r => `<div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between space-x-4"><div class="space-y-1"><h3 class="font-bold text-slate-900">${r.name}</h3><p class="text-xs text-slate-500">${r.cuisine} &bull; <span class="text-amber-600 font-semibold"><i class="fa-solid fa-star mr-1"></i>${r.rating}</span></p></div><a href="${r.link}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors shrink-0">Yol Tarifi <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i></a></div>`).join("");
}
function setupInteractions() {
    const favBtn = document.getElementById("favorite-btn");
    let isFav = false;
    favBtn.addEventListener("click", () => {
        isFav = !isFav;
        const icon = favBtn.querySelector("i");
        if (isFav) { icon.className = "fa-solid fa-heart text-red-500"; favBtn.classList.add("bg-red-50", "border-red-200"); }
        else { icon.className = "fa-regular fa-heart text-red-500"; favBtn.classList.remove("bg-red-50", "border-red-200"); }
    });
    const shareBtn = document.getElementById("share-btn");
    shareBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const originalText = shareBtn.querySelector("span").textContent;
            shareBtn.querySelector("span").textContent = "Kopyalandı!";
            setTimeout(() => { shareBtn.querySelector("span").textContent = originalText; }, 2000);
        });
    });
}