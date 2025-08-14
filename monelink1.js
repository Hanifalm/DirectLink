(function() {
  const links = [
    "https://otieu.com/4/9483206",
    "https://otieu.com/4/9483206"
  ];

  const storageKeyTime = "lastClickTime_random";
  const storageKeyCount = "clickCount_random";
  const cooldown = 3 * 60 * 1000; // 5 menit
  const maxOpens = 2; // maksimal buka link 2 kali

  document.addEventListener("click", function handleClick() {
    const now = Date.now();
    const last = parseInt(localStorage.getItem(storageKeyTime), 10) || 0;
    const count = parseInt(localStorage.getItem(storageKeyCount), 10) || 0;

    // Kalau sudah 2 kali buka, hentikan
    if (count >= maxOpens) {
      return;
    }

    // Kalau sudah lewat cooldown, buka link baru
    if (now - last >= cooldown) {
      const randomLink = links[Math.floor(Math.random() * links.length)];
      window.open(randomLink, "_blank");
      localStorage.setItem(storageKeyTime, now.toString());
      localStorage.setItem(storageKeyCount, (count + 1).toString());
    }
  });
})();
