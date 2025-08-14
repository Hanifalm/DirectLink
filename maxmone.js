(function() {
  const links = [
    "https://otieu.com/4/9483206",
    "https://otieu.com/4/9483206
  ];

  const storageKeyTime = "lastClickTime_random";
  const storageKeyCount = "clickCount_random";
  const cooldown = 1 * 60 * 1000; // 5 menit
  const maxOpens = 2; // maksimal buka link 2 kali

  document.addEventListener("click", function handleClick() {
    const now = Date.now();
    const last = parseInt(localStorage.getItem(storageKeyTime), 10) || 0;
    let count = parseInt(localStorage.getItem(storageKeyCount), 10) || 0;

    // kalau sudah 2 kali buka, stop
    if (count >= maxOpens) return;

    // kalau belum mencapai maxOpens, langsung buka tanpa cek cooldown
    if (count < maxOpens) {
      const randomLink = links[Math.floor(Math.random() * links.length)];
      window.open(randomLink, "_blank");
      count++;
      localStorage.setItem(storageKeyCount, count.toString());
      localStorage.setItem(storageKeyTime, now.toString());
      return;
    }

    // kalau sudah maxOpens, cek cooldown baru boleh reset
    if (now - last >= cooldown) {
      localStorage.setItem(storageKeyCount, "0");
    }
  });
})();
