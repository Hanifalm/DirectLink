(function() {
  const links = [
    "https://chinesedrama99756.site/",
    "https://chinesedrama99756.site/"
  ];

  const storageKey = "lastClickTime_random";
  const cooldown = 5 * 60 * 1000; // 5 menit

  document.addEventListener("click", function handleClick() {
    const now = Date.now();
    const last = parseInt(localStorage.getItem(storageKey), 10) || 0;

    if (now - last >= cooldown) {
      const randomLink = links[Math.floor(Math.random() * links.length)];
      window.open(randomLink, "_blank");
      localStorage.setItem(storageKey, now.toString());
    }
  });
})();
