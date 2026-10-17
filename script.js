/* =====================================================
   EDIT DATA UNDANGAN DI SINI SAJA
   ===================================================== */
const DATA = {
  title: "Totty & Yanthy",
  groomName: "Gerson Pandju Walandima",
  brideName: "Lusia Konga Naha, S.Si",
  groomParents: "Anak ke-8, putra ke-4 dari pasangan Bapak Markus Mudi Kehewamarak (Alm) dan Ibu Mbati Ataluda (Alm)",
  brideParents: "Putri pertama, anak ke-2 dari pasangan Bapak Katanga Jongu Marada (Alm) dan Ibu Lawa Djati (Alm)",
  countdownTo: "2026-10-25T08:00:00+08:00",
  dateLong: "Minggu, 25 Oktober 2026",
  verse: "\u201cBerdua lebih baik dari pada seorang diri, karena dalam dua orang ada berkat. Kalau seorang jatuh, yang lain dapat mengangkatnya.\u201d",
  verseRef: "Pengkhotbah 4 : 9-10",
  intro: "Tuhan membuat segala sesuatu indah pada waktunya. Indah saat Dia mempertemukan, indah saat Dia menumbuhkan kasih, dan indah saat Dia mempersatukan kami dalam suatu ikatan pernikahan kudus.",
  invite: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",
  events: [
    { name: "Pemberkatan Nikah", date: "Minggu, 25 Oktober 2026", time: "Pukul 08.00 WITA - selesai", place: "GKS Padiratana Mauliru", map: "GKS Padiratana Mauliru" },
    { name: "Resepsi Pernikahan", date: "Minggu, 25 Oktober 2026", time: "Pukul 18.00 WITA s.d. selesai", place: "Rumah Mempelai Pria, Mauliru - Kamburuwai", map: "Mauliru Kamburuwai Sumba Timur" }
  ],
  giftText: "Doa restu Anda adalah karunia yang sangat berarti bagi kami.",
  gifts: [
    { bank: "BANK NTT", number: "2510516168", owner: "a/n Lusia Konga Naha" }
  ],
  gallery: ["img/foto1.jpg", "img/foto2.jpg", "img/foto3.jpg", "img/foto4.jpg", "img/foto5.jpg", "img/foto6.jpg"]
};

/* ===================================================== */
const $ = (s, el = document) => el.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

// Isi teks dari data
document.querySelectorAll("[data-bind]").forEach(el => { el.textContent = DATA[el.dataset.bind] || ""; });
document.title = "Undangan " + DATA.title;

// Nama tamu dari link: ?nama=Alfred  (textContent = aman dari injeksi)
const guest = new URLSearchParams(location.search).get("nama");
if (guest) $("#guestName").textContent = guest;

// Acara, peta, cerita, galeri, amplop
$("#eventList").innerHTML = DATA.events.map(e =>
  `<div class="event"><h3>${esc(e.name)}</h3><p>${esc(e.date)}</p><p>${esc(e.time)}</p><p>${esc(e.place)}</p><p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.map)}" target="_blank" rel="noopener">Lihat lokasi</a></p></div>`).join("");
$("#galleryGrid").innerHTML = DATA.gallery.map((src, i) =>
  `<img src="${esc(src)}" alt="Foto ${i + 1}" loading="lazy">`).join("");

$("#giftList").innerHTML = DATA.gifts.map(g =>
  `<div class="card"><h3>${esc(g.bank)}</h3><p class="no">${esc(g.number)}</p><p>${esc(g.owner)}</p><br><button data-copy="${esc(g.number)}">Salin nomor</button></div>`).join("");

// Salin nomor rekening
const toast = $("#toast");
document.addEventListener("click", e => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  navigator.clipboard.writeText(b.dataset.copy).then(() => {
    toast.textContent = "Nomor rekening disalin";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  });
});

// Lightbox galeri
const lb = $("#lightbox");
$("#galleryGrid").addEventListener("click", e => {
  if (e.target.tagName !== "IMG") return;
  $("img", lb).src = e.target.src; lb.hidden = false;
});
lb.addEventListener("click", () => lb.hidden = true);
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

// Buka undangan + musik
const bgm = $("#bgm"), musicBtn = $("#musicBtn");
$("#openBtn").addEventListener("click", () => {
  $("#cover").classList.add("open");
  document.body.classList.remove("locked");
  musicBtn.hidden = false;
  bgm.play().then(() => musicBtn.classList.add("on")).catch(() => {});
  setTimeout(() => $("#cover").style.display = "none", 1000);
});
musicBtn.addEventListener("click", () => {
  if (bgm.paused) { bgm.play(); musicBtn.classList.add("on"); }
  else { bgm.pause(); musicBtn.classList.remove("on"); }
});

// Hitung mundur
const target = new Date(DATA.countdownTo).getTime();
function tick() {
  const d = Math.max(0, target - Date.now());
  $("#cd-d").textContent = Math.floor(d / 864e5);
  $("#cd-h").textContent = Math.floor(d % 864e5 / 36e5);
  $("#cd-m").textContent = Math.floor(d % 36e5 / 6e4);
  $("#cd-s").textContent = Math.floor(d % 6e4 / 1e3);
}
tick(); setInterval(tick, 1000);