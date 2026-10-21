document.addEventListener("DOMContentLoaded", () => {
    if (typeof SPOT_DATA === "undefined") return;
    document.body.className = "bg-slate-50 text-slate-800 font-['Inter',sans-serif]";
    document.getElementById("hero-cover").src = SPOT_DATA.hero.coverImage;
    document.getElementById("hero-category").textContent = SPOT_DATA.hero.category;
    document.getElementById("hero-badge").textContent = SPOT_DATA.hero.badge;
    document.getElementById("hero-title").textContent = SPOT_DATA.hero.title;
    document.getElementById("hero-subtitle").textContent = SPOT_DATA.hero.subtitle;
    document.getElementById("hero-stats").innerHTML = SPOT_DATA.hero.stats.map(s => `<div><p class="text-xs uppercase tracking-wider text-slate-300">${s.label}</p><p class="text-xl sm:text-2xl font-bold">${s.value}</p></div>`).join("");
    document.getElementById("venue-summary-box").innerHTML = `<div class="relative z-10 space-y-4"><h3 class="text-xl font-bold">${SPOT_DATA.summary.typeTitle}</h3><p>${SPOT_DATA.summary.description}</p></div>`;
    document.getElementById("overview-paragraphs").innerHTML = SPOT_DATA.overview.paragraphs.map(p => `<p>${p}</p>`).join("");
    document.getElementById("visitor-notes-list").innerHTML = SPOT_DATA.overview.visitorNotes.map(n => `<li class="flex items-start space-x-3"><i class="fa-solid fa-circle-check text-emerald-600 mt-1"></i><span><strong>${n.title}:</strong> ${n.description}</span></li>`).join("");
    document.getElementById("why-visit-cards").innerHTML = SPOT_DATA.whyVisit.map(c => `<div class="bg-white p-6 rounded-2xl shadow-sm border space-y-2"><h3 class="font-bold">${c.title}</h3><p class="text-sm text-slate-600">${c.description}</p></div>`).join("");
    document.getElementById("must-see-items").innerHTML = SPOT_DATA.mustSee.map(i => `<div class="bg-white rounded-2xl overflow-hidden shadow-sm border"><img src="${i.image}" class="w-full h-40 object-cover"><div class="p-4"><h3 class="font-bold">${i.title}</h3><p class="text-sm text-slate-600">${i.description}</p></div></div>`).join("");
    document.getElementById("transportation-methods").innerHTML = SPOT_DATA.transportation.methods.map(m => `<div><strong>${m.title}:</strong> ${m.detail}</div>`).join("");
    document.getElementById("transportation-tip").innerHTML = `<strong>İpucu:</strong> ${SPOT_DATA.transportation.tip}`;
    const mapBtn = document.getElementById("map-direction-btn");
    mapBtn.href = SPOT_DATA.transportation.mapUrl; mapBtn.target = "_blank"; mapBtn.rel = "noopener noreferrer";
});