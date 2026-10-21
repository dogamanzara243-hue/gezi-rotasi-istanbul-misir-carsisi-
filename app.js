document.addEventListener("DOMContentLoaded", () => {
    if (typeof SPOT_DATA === "undefined") { console.error("SPOT_DATA bulunamadı!"); return; }
    renderTheme(); renderHero(); renderVenueSummary(); renderOverview(); renderWhyVisit(); renderMustSee(); renderTransportation(); renderWhereToStay(); renderWhereToEat(); initInteractions();
});

function renderTheme() { document.body.className = `bg-slate-50 text-slate-800 font-sans antialiased theme-${SPOT_DATA.theme || 'history'}`; }

function renderHero() {
    const heroCover = document.getElementById("hero-cover");
    const heroBadges = document.getElementById("hero-badges");
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroStats = document.getElementById("hero-stats");

    if (heroCover) heroCover.src = SPOT_DATA.hero.coverImage;
    if (heroTitle) heroTitle.textContent = SPOT_DATA.title;
    if (heroSubtitle) heroSubtitle.textContent = SPOT_DATA.subtitle;

    if (heroBadges && SPOT_DATA.hero.badges) {
        heroBadges.innerHTML = SPOT_DATA.hero.badges.map(b => `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20"><i class="${b.icon} mr-1.5"></i> ${b.text}</span>`).join('');
    }
    if (heroStats && SPOT_DATA.hero.stats) {
        heroStats.innerHTML = SPOT_DATA.hero.stats.map(s => `<div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10"><div class="text-slate-300 text-xs font-medium uppercase tracking-wider">${s.label}</div><div class="text-xl sm:text-2xl font-bold text-white mt-1">${s.value}</div></div>`).join('');
    }
}

function renderVenueSummary() {
    const summaryBox = document.getElementById("venue-summary-box");
    if (!summaryBox || !SPOT_DATA.summary) return;
    summaryBox.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
                <span class="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-md">${SPOT_DATA.summary.type}</span>
                <h3 class="text-2xl font-serif font-bold text-slate-900">${SPOT_DATA.title}</h3>
                <p class="text-slate-600 text-base max-w-3xl">${SPOT_DATA.summary.description}</p>
            </div>
            <div class="flex flex-wrap gap-2">
                ${SPOT_DATA.summary.badges.map(b => `<div class="bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-amber-200/60 shadow-sm text-center"><div class="text-xs text-slate-500">${b.label}</div><div class="font-bold text-slate-800 text-sm">${b.value}</div></div>`).join('')}
            </div>
        </div>`;
}

function renderOverview() {
    const pContainer = document.getElementById("overview-paragraphs");
    const notesList = document.getElementById("visitor-notes-list");
    if (pContainer && SPOT_DATA.overview.paragraphs) pContainer.innerHTML = SPOT_DATA.overview.paragraphs.map(p => `<p>${p}</p>`).join('');
    if (notesList && SPOT_DATA.overview.visitorNotes) notesList.innerHTML = SPOT_DATA.overview.visitorNotes.map(n => `<li class="flex items-start"><i class="fa-solid fa-check text-amber-600 mt-1 mr-2.5 shrink-0"></i><span>${n}</span></li>`).join('');
}

function renderWhyVisit() {
    const container = document.getElementById("why-visit-cards");
    if (!container || !SPOT_DATA.whyVisit) return;
    container.innerHTML = SPOT_DATA.whyVisit.map(i => `<div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover-lift space-y-4"><div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl"><i class="${i.icon}"></i></div><h3 class="text-xl font-serif font-bold text-slate-900">${i.title}</h3><p class="text-slate-600 text-sm leading-relaxed">${i.description}</p></div>`).join('');
}

function renderMustSee() {
    const container = document.getElementById("must-see-items");
    if (!container || !SPOT_DATA.mustSee) return;
    container.innerHTML = SPOT_DATA.mustSee.map(i => `<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover-lift flex flex-col"><div class="h-48 overflow-hidden relative"><img src="${i.image}" alt="${i.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"></div><div class="p-5 flex-1 flex flex-col justify-between space-y-3"><h4 class="font-serif font-bold text-slate-900 text-lg">${i.title}</h4><p class="text-slate-600 text-xs leading-relaxed">${i.description}</p></div></div>`).join('');
}

function renderTransportation() {
    const methodsContainer = document.getElementById("transportation-methods");
    const tipContainer = document.getElementById("transportation-tip");
    const mapBtn = document.getElementById("map-direction-btn");
    if (methodsContainer && SPOT_DATA.transportation.methods) {
        methodsContainer.innerHTML = SPOT_DATA.transportation.methods.map(m => `<div class="flex items-start space-x-3"><div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5"><i class="${m.icon}"></i></div><div><h5 class="font-semibold text-slate-800 text-sm">${m.title}</h5><p class="text-slate-600 text-xs mt-0.5">${m.description}</p></div></div>`).join('');
    }
    if (tipContainer && SPOT_DATA.transportation.tip) tipContainer.innerHTML = `<i class="fa-solid fa-lightbulb mr-2"></i> ${SPOT_DATA.transportation.tip}`;
    if (mapBtn && SPOT_DATA.transportation.mapUrl) mapBtn.href = SPOT_DATA.transportation.mapUrl;
}

function renderWhereToStay() {
    const container = document.getElementById("hotel-list");
    if (!container || !SPOT_DATA.whereToStay) return;
    container.innerHTML = SPOT_DATA.whereToStay.map(h => `<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover-lift flex flex-col justify-between"><div class="p-6 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md"><i class="fa-solid fa-star text-amber-500 mr-1"></i> ${h.rating}</span><span class="text-xs text-slate-400">${h.distance}</span></div><h4 class="font-serif font-bold text-slate-900 text-lg">${h.name}</h4><p class="text-slate-600 text-xs leading-relaxed">${h.description}</p></div><div class="px-6 pb-6 pt-0"><a href="${h.bookingUrl}" target="_blank" class="w-full inline-flex items-center justify-center py-2.5 px-4 bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-700 rounded-xl font-medium text-xs transition-colors"><i class="fa-solid fa-arrow-up-right-from-square mr-1.5"></i> Google Travel'da İncele</a></div></div>`).join('');
}

function renderWhereToEat() {
    const container = document.getElementById("restaurant-list");
    if (!container || !SPOT_DATA.whereToEat) return;
    container.innerHTML = SPOT_DATA.whereToEat.map(r => `<div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover-lift flex flex-col justify-between"><div class="p-6 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md">${r.specialty}</span><span class="text-xs font-medium text-slate-500">${r.priceRange}</span></div><h4 class="font-serif font-bold text-slate-900 text-lg">${r.name}</h4><p class="text-slate-600 text-xs leading-relaxed">${r.description}</p></div><div class="px-6 pb-6 pt-0"><a href="${r.mapUrl}" target="_blank" class="w-full inline-flex items-center justify-center py-2.5 px-4 bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-700 rounded-xl font-medium text-xs transition-colors"><i class="fa-solid fa-map-pin mr-1.5"></i> Google Maps'te Gör</a></div></div>`).join('');
}

function initInteractions() {
    const favoriteBtn = document.getElementById("favorite-btn");
    const shareBtn = document.getElementById("share-btn");
    if (favoriteBtn) {
        let isFav = false;
        favoriteBtn.addEventListener("click", () => {
            isFav = !isFav;
            const icon = favoriteBtn.querySelector("i");
            icon.className = isFav ? "fa-solid fa-heart text-lg text-rose-500" : "fa-regular fa-heart text-lg";
        });
    }
    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href).then(() => alert("Bağlantı kopyalandı!"));
        });
    }
}
