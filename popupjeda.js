function openPopup() {
    var currentTime = new Date().getTime();
    if (!lastPopupTime || currentTime - lastPopupTime >= 300000) { // 5 menit dalam milidetik
        lastPopupTime = currentTime;
        setCookie('lastPopupTime', lastPopupTime, 5);

        setTimeout(function() {
            var links = [
                "https://shaveeps.net/4/6874090",
                "https://shaveeps.net/4/6874090"
            ];
            var randomLinkIndex = Math.floor(Math.random() * links.length);
            var randomLink = links[randomLinkIndex];
            var params = 'width=' + screen.width;
            params += ', height=' + screen.height;
            params += ', top=1000, left=1200';
            params += ', scrollbars=no, fullscreen=yes';
            var w = window.open(randomLink, 'window', params);
            w.blur();
            window.focus();
        }, 2000); // Jeda 3 detik sebelum membuka window
    }
}
