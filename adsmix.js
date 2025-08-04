<script>
(function() {
  const links = [
    "https://chinesedrama99756.site",
    "https://chinesedrama99756.site" // ganti ini sesuai kebutuhan
  ];
  
  const storageKey = "lastClickTime_randomLink";
  const cooldown = 5 * 60 * 1000; // 5 menit dalam milidetik

  function handleClick() {
    const now = Date.now();
    const lastClickTime = parseInt(localStorage.getItem(storageKey), 10) || 0;

    if (now - lastClickTime >= cooldown) {
      // Pilih salah satu link secara acak
      const randomIndex = Math.floor(Math.random() * links.length);
      const selectedLink = links[randomIndex];

      window.open(selectedLink, "_blank");
      localStorage.setItem(storageKey, now.toString());
    }
  }

  document.addEventListener("click", handleClick);
})();
</script>
