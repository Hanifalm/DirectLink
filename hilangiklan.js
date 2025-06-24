(function () {
    const iframes = document.querySelectorAll('iframe');

    iframes?.forEach(iframe => {
        const src = iframe.src || '';

        if (src.includes('smoothpre.com') || src.includes('movearnpre.com')) {
            // Tambahkan allowfullscreen jika belum ada
            if (!iframe.hasAttribute('allowfullscreen')) {
                iframe.setAttribute('allowfullscreen', '');
            }

            // Tambahkan security="restricted" jika belum ada
            if (!iframe.hasAttribute('security')) {
                iframe.setAttribute('security', 'restricted');
            }

            // Tambahkan sandbox jika belum ada
            if (!iframe.hasAttribute('sandbox')) {
                iframe.setAttribute('sandbox', 'allow-same-origin allow-forms allow-scripts');
            }
        }
    });
})();
