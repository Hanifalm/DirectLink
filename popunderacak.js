function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (minutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

var lastPopupTime = getCookie('lastPopupTime');

function openPopup() {
    var currentTime = new Date().getTime();
    if (!lastPopupTime || currentTime - lastPopupTime >= 300000) { // 5 menit dalam milidetik
        lastPopupTime = currentTime;
        setCookie('lastPopupTime', lastPopupTime, 5);

        var links = [
            "https://shaveeps.net/4/6874090",
            "https://slippersprimeexaltation.com/exdjpzgxib?key=1cdc385e09d94b5fbd557fa4a59a4d42"
    
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
    }
}

document.body.addEventListener("click", openPopup);
