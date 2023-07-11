const checkLink = (link) => {
    const pattern = /youtube.com\/watch/;
    return pattern.test(link);
};

const convert = (videoId) => {
    console.log('[yt2mp3] Video ID: ', videoId);

    fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '912a946990mshd4f4138344b2b9bp187843jsn8000b12a1fdb',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('[yt2mp3] Data: ', data);
        window.open(data.link, '_blank');
    })
    .catch(error => {
        console.log('[yt2mp3] Error: ', error);
    });
};

const downloadVideo = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        link = tabs[0].url;

        const isLinkValid = checkLink(link);

        if (isLinkValid === false) {
            console.log('[yt2mp3] Invalid Link');
            return;
        }

        console.log('[yt2mp3] Downloading...');

        const startIndex = link.indexOf('?') + 3;
        let endIndex = link.indexOf('&');

        if (endIndex === -1) {
            endIndex = link.length;
        }
        
        const videoId = link.slice(startIndex, endIndex);
        convert(videoId);
    });
};

document.querySelector('button').addEventListener('click', downloadVideo);