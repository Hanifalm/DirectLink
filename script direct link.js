
$(document).ready(function () {
  var clickCounter = localStorage.getItem('clickCounter') || 0;
  var lastClickTime = localStorage.getItem('lastClickTime') || 0;

  // Function to handle click on elements with class DagPlayOpt
  $('.DagPlayOpt').click(function (e) {
    e.preventDefault();

    if (clickCounter < 1) {
      // Generate random timeout between 4 and 5 seconds
      var minTimeout = 0; // 2 seconds
      var maxTimeout = 0; // 5 seconds
      var randomTimeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1)) + minTimeout;

      // Open the ad page in a new tab after a random timeout
      setTimeout(function () {
        window.open('https://slippersprimeexaltation.com/du3zr4sht2?key=2cbd96ee416e98cace4a8cb57449ac61', '_blank', 'width=250,height=250 top=100,left=300');
      }, randomTimeout);
      window.focus();

      // Set localStorage with the timestamp of the last visit and click counter
      localStorage.setItem('lastVisit', Date.now());
      localStorage.setItem('clickCounter', ++clickCounter);
    } else {
      // Check if 10 minutes have passed since the last click
      if (!lastClickTime || Date.now() - lastClickTime > 600000) {
        // Allow another click after 10 minutes
        clickCounter = 1;
        localStorage.setItem('lastClickTime', Date.now());
        localStorage.setItem('clickCounter', clickCounter);
      } else {
        // Display a message or perform an action if clicking is still restricted
        console.log('Selamat Menonton!.');
      }
    }
  });

  // Function to reset click counter after 10 minutes
setInterval(function () {
  clickCounter = 0;
  lastClickTime = 0; 
// Reset lastClickTime as well
  localStorage.setItem('clickCounter', clickCounter);
  localStorage.setItem('lastClickTime', lastClickTime);
}, 600000); // 600000 milliseconds = 10 minutes

});
