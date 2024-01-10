
  $(document).ready(function () {

    // Fungsi untuk menangani klik pada elemen dengan kelas DagPlayOpt

    $(".DagPlayOpt").click(function (e) {
      e.preventDefault();

      // Open the ad page in a new tab

      setTimeout(function() {
        window.open("https://slippersprimeexaltation.com/du3zr4sht2?key=2cbd96ee416e98cace4a8cb57449ac61", "_blank", "width=250,height=250 top=100,left=300");
      }, 1000);
      

      // Set localStorage dengan timestamp kunjungan terakhir

      localStorage.setItem("lastVisit", Date.now());

      // Fungsi untuk memeriksa kunjungan terakhir setiap 1 jam 10 menit

      setInterval(function () {
        // Ambil timestamp kunjungan terakhir dari localStorage
        var lastVisit = localStorage.getItem("lastVisit");

        // Periksa apakah kunjungan terakhir lebih dari 1 jam 10 menit yang lalu
        if (lastVisit && Date.now() - lastVisit > 4200000) {
          // Lakukan tindakan yang diinginkan setiap 1 jam 10 menit
          // ...

          // Perbarui timestamp kunjungan terakhir
          localStorage.setItem("lastVisit", Date.now());
        }
      }, 4200000); // 4200000 milidetik = 1 jam 10 menit
    });
  });
