const openUrls = [
  'https://otieu.com/4/10094579',
  'https://procureshaft.com/jp49xb6u?key=c69ae49849728b3b7327f76d8ad3adba' // ganti dengan link kedua kamu
];
const popupTitle = 'SafePopup';
const maxOpenPerSession = 1;
const resetTime = 1; // dalam detik
const popupWidth = 0;
const popupHeight = 0;
const cookieName = 'safe_popup_click';

// localStorage keys
const LS_USED_KEY = 'safePopupUsedIndices';
const LS_RESET_AT = 'safePopupResetAt';
const LS_COUNT_KEY = 'safePopupCount';

function setCookie(name, value, seconds) {
  const expires = new Date(Date.now() + seconds * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  localStorage.setItem(LS_RESET_AT, String(Date.now() + seconds * 1000));
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

function openPopup(url, title, width, height) {
  const screenLeft = window.screenLeft ?? window.screenX;
  const screenTop = window.screenTop ?? window.screenY;
  const innerWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const innerHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const popupW = width === 0 ? innerWidth : width;
  const popupH = height === 0 ? innerHeight : height;
  const left = innerWidth / 2 - popupW / 2 + screenLeft;
  const top = innerHeight / 2 - popupH / 2 + screenTop;
  try {
    return window.open(url, title, `scrollbars=yes,width=${popupW},height=${popupH},top=${top},left=${left}`);
  } catch (e) {
    return null;
  }
}

function removeOverlay() {
  const overlay = document.getElementById('safePopupArea');
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

// Ambil array indeks yang sudah dipakai (disimpan di localStorage)
function getUsedIndices() {
  try {
    const raw = localStorage.getItem(LS_USED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}
function setUsedIndices(arr) {
  try {
    localStorage.setItem(LS_USED_KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
}
function clearUsedIndices() {
  localStorage.removeItem(LS_USED_KEY);
  localStorage.removeItem(LS_RESET_AT);
}

// jika waktu reset lewat, bersihkan used indices
function clearUsedIfExpired() {
  const resetAt = parseInt(localStorage.getItem(LS_RESET_AT) || '0', 10);
  if (!resetAt) return;
  if (Date.now() > resetAt) {
    clearUsedIndices();
  }
}

// Pilih URL acak tanpa mengulang hingga semua link dipakai
function chooseNonRepeatingUrl() {
  if (!Array.isArray(openUrls) || openUrls.length === 0) return null;
  if (openUrls.length === 1) return openUrls[0];

  clearUsedIfExpired();

  const used = getUsedIndices();
  if (used.length >= openUrls.length) {
    setUsedIndices([]);
    used.length = 0;
  }

  const available = [];
  for (let i = 0; i < openUrls.length; i++) {
    if (!used.includes(i)) available.push(i);
  }

  if (available.length === 0) {
    setUsedIndices([]);
    const idx = Math.floor(Math.random() * openUrls.length);
    setUsedIndices([idx]);
    return openUrls[idx];
  }

  const pickIdx = available[Math.floor(Math.random() * available.length)];
  used.push(pickIdx);
  setUsedIndices(used);

  return openUrls[pickIdx];
}

// deteksi userAgent webview TikTok / Instagram / Facebook biasa
function isInAppBrowser() {
  const ua = navigator.userAgent || '';
  const lower = ua.toLowerCase();
  return (
    lower.includes('tiktok') ||
    lower.includes('fbav') ||            // facebook app
    lower.includes('instagram') ||
    lower.includes('wv') ||              // webview
    lower.includes('mobile safari') && lower.includes('version/') // some mobile sfs
  );
}

function openPopupOnce() {
  const opened = parseInt(localStorage.getItem(LS_COUNT_KEY) || '0', 10);
  if (opened >= maxOpenPerSession) {
    removeOverlay();
    return;
  }

  const urlToOpen = chooseNonRepeatingUrl();
  if (!urlToOpen) {
    removeOverlay();
    return;
  }

  // buka popup / link
  const newWin = openPopup(urlToOpen, popupTitle, popupWidth, popupHeight);
  localStorage.setItem(LS_COUNT_KEY, String(opened + 1));
  setCookie(cookieName, 'clicked', resetTime);

  // Jika berada dalam in-app browser (TikTok dll), jangan tunggu fokus:
  // langsung hapus overlay supaya user tidak stuck di halaman overlay.
  if (isInAppBrowser()) {
    // delay tipis agar openPopup punya kesempatan diproses oleh webview
    setTimeout(removeOverlay, 300);
    return;
  }

  // Normal flow: tunggu fokus kembali / popup ditutup
  if (newWin) {
    let focused = false;
    const focusCheck = setInterval(() => {
      if (document.hasFocus() && focused) {
        clearInterval(focusCheck);
        removeOverlay();
      } else if (newWin.closed) {
        clearInterval(focusCheck);
        removeOverlay();
      } else {
        try {
          newWin.focus();
          focused = true;
        } catch (e) {
          clearInterval(focusCheck);
          removeOverlay();
        }
      }
    }, 300);
  } else {
    // jika popup diblokir, hapus overlay setelah delay kecil
    setTimeout(removeOverlay, 5000);
  }
}

function createSafePopupArea() {
  if (document.getElementById('safePopupArea')) return;
  const opened = parseInt(localStorage.getItem(LS_COUNT_KEY) || '0', 10);
  if (opened >= maxOpenPerSession) return;

  const div = document.createElement('div');
  div.id = 'safePopupArea';
  div.style.cssText = `
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:999999;
    opacity:0.01;
    background:none;
    cursor:pointer;
  `;
  div.addEventListener('click', openPopupOnce);
  document.body.appendChild(div);
}

function addPostClickHandler() {
  const postSelectors = 'a[href], article, .post, .entry-title, .post-title';
  const postEls = document.querySelectorAll(postSelectors);
  postEls.forEach(el => {
    if (el.tagName.toLowerCase() === 'a') {
      el.addEventListener('click', () => openPopupOnce(), { passive: true });
    } else {
      el.addEventListener('click', e => {
        if (e.target.closest && e.target.closest('a')) return;
        openPopupOnce();
      }, { passive: true });
    }
  });
}

function initSafePopup() {
  const cookieVal = getCookie(cookieName);
  if (!cookieVal) {
    localStorage.setItem(LS_COUNT_KEY, '0');
    setCookie(cookieName, 'ready', resetTime);
  } else {
    const resetAt = localStorage.getItem(LS_RESET_AT);
    if (!resetAt) {
      localStorage.setItem(LS_RESET_AT, String(Date.now() + resetTime * 1000));
    }
  }

  clearUsedIfExpired();

  // tambahan: jika halaman menjadi tersembunyi (user pindah ke browser atau webview buka link),
  // segera hapus overlay saat visibility berubah.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      removeOverlay();
    }
  }, { passive: true });

  // juga tangani pagehide dan blur sebagai backup
  window.addEventListener('pagehide', removeOverlay, { passive: true });
  window.addEventListener('blur', removeOverlay, { passive: true });

  createSafePopupArea();
  addPostClickHandler();

  // safety fallback: hapus overlay jika masih tersisa >5 detik
  setTimeout(() => {
    const opened = parseInt(localStorage.getItem(LS_COUNT_KEY) || '0', 10);
    if (opened >= maxOpenPerSession) removeOverlay();
  }, 5000);
}

window.addEventListener('load', initSafePopup);
</script>
