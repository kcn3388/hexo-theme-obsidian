String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
var e = document.getElementById("musicid")
if (typeof (musicURL) == "undefined") {
    var musicURL
    var detailURL
    var musicData
    var detailData
    var httpsurl
}

musicURL = "//api.kcn3388.club/netease/song/url?id=" + e.className
detailURL = "//api.kcn3388.club/netease/song/detail?ids=" + e.className

fetchsong();

function fetchsong() {
    fetch(musicURL)
        .then(response => response.json())
        .then(result => {
            musicData = result;
            if (musicData.code == 200) {
                httpsurl = musicData.data[0].url.splice(4, "s");
                // console.log(httpsurl)
                fetchdetails();
            }
        });
}

function fetchdetails() {
    fetch(detailURL)
        .then(response => response.json())
        .then(result => {
            detailData = result;
            if (detailData.code == 200) {
                const ap1 = new APlayer({
                    element: document.getElementById('player1'),
                    autoplay: false,
                    mutex: true,
                    preload: 'metadata',
                    audio: [{
                        name: detailData.songs[0].name,
                        artist: detailData.songs[0].ar[0].name,
                        url: httpsurl,
                        cover: detailData.songs[0].al.picUrl,
                        theme: '#ebd0c2'
                    }]
                });
            }
        });
}