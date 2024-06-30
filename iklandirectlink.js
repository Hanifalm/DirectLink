
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

var lastPopupTime = getCookie('lastPopupTime');

function openPopup() {
    var currentTime = new Date().getTime();
    if (!lastPopupTime || currentTime - lastPopupTime >= 3600000) { // 1 jam dalam milidetik
        lastPopupTime = currentTime;
        setCookie('lastPopupTime', lastPopupTime, 1);

        var params = 'width=' + screen.width;
        params += ', height=' + screen.height;
        params += ', top=1000, left=1200';
        params += ', scrollbars=no, fullscreen=yes';

        var w = window.open("https://shaveeps.net/4/6874090", 'window', params);
        w.blur();
        window.focus();
    }
}

document.body.addEventListener("click", openPopup);
