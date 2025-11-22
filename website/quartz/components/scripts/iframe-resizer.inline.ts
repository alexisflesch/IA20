window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'resize') {
        const iframes = document.getElementsByTagName('iframe')
        for (let i = 0; i < iframes.length; i++) {
            if (iframes[i].contentWindow === e.source) {
                iframes[i].style.height = e.data.height + 'px'
                break
            }
        }
    }
})
