(function() {
  const links = [
    "https://otieu.com/4/9483206",
    "https://otieu.com/4/9483206"
  ];

  const storageKeyTime = "lastClickTime_random";
  const storageKeyCount = "clickCount_random";
  const cooldown = 1 * 60 * 1000; // 1 menit
  const maxOpens = 2; // maksimal buka link 2 kali

  document.addEventListener("click", function handleClick() {
    const now = Date.now();
    let last = parseInt(localStorage.getItem(storageKeyTime), 10) || 0;
    let count = parseInt(localStorage.getItem(storageKeyCount), 10) || 0;

    // Kalau sudah maxOpens, cek apakah cooldown sudah lewat
    if (count >= maxOpens) {
      if (now - last >= cooldown) {
        // Reset counter
        count = 0;
        localStorage.setItem(storageKeyCount, "0");
        last = 0;
      } else {
        return; // masih cooldown, jangan buka link
      }
    }

    // Buka link
    const randomLink = links[Math.floor(Math.random() * links.length)];
    window.open(randomLink, "_blank");

    // Update data
    count++;
    localStorage.setItem(storageKeyCount, count.toString());
    localStorage.setItem(storageKeyTime, now.toString());
  });
})();
