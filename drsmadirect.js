function openPopup() {
    if (document.cookie.indexOf("bkc=lyk") == -1) {
        var currentTime = new Date().getTime();
        var expirationTime = currentTime + (5 * 60 * 1000); // 5 minutes
        document.cookie = "bkc=lykshoptinhoc; expires=" + new Date(expirationTime).toUTCString();

        var params = 'width=' + screen.width;
        params += ', height=' + screen.height;
        params += ', top=1000, left=1200';
        params += ', scrollbars=no, fullscreen=yes';

        var w = window.open("https://slippersprimeexaltation.com/exdjpzgxib?key=1cdc385e09d94b5fbd557fa4a59a4d42", 'window', params);
        w.blur();
        window.focus();
    }
}

document.body.addEventListener("click", openPopup);
