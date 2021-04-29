var e = document.getElementById("musicid")
if (typeof (musicURL) == "undefined") {
    var musicURL
    var detailURL
    var musicRequest = new XMLHttpRequest;
    var dataRequest = new XMLHttpRequest;
    var musicData;
    var detailData
}

musicURL = "//api.kcn3388.com/song/url?id=" + e.className
detailURL = "//api.kcn3388.com/song/detail?ids=" + e.className

musicRequest.onreadystatechange = function () {
    if (musicRequest.readyState == 4 && musicRequest.status == 200) {
        musicData = JSON.parse(musicRequest.responseText);
        console.log(musicData.data[0])
    }
}
musicRequest.open('GET', musicURL);
musicRequest.send();
dataRequest.onreadystatechange = function () {
    if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        detailData = JSON.parse(dataRequest.responseText);
        console.log(detailData.songs[0])
        const ap1 = new APlayer({
            element: document.getElementById('player1'),
            mini: false,
            autoplay: false,
            lrcType: false,
            mutex: true,
            preload: 'metadata',
            audio: [{
                name: detailData.songs[0].name,
                artist: detailData.songs[0].ar[0].name,
                url: musicData.data[0].url,
                cover: detailData.songs[0].al.picUrl,
                theme: '#ebd0c2'
            }]
        });
    }
}
dataRequest.open('GET', detailURL);
dataRequest.send();