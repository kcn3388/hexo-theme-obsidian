String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
var e = document.getElementById("musicid")

set_single();

function set_single(){
    if (typeof (musicURL) == "undefined") {
        var musicURL;
        var detailURL;
        var musicData;
        var detailData;
        var httpsurl;
        var lrcURL;
        var lrcData;
        var s_lyric;
        var cookie = "&cookie=" + atob(encrypt);
    }

    musicURL = "//api.kcn3388.club/netease/song/url?id=" + e.className;
    detailURL = "//api.kcn3388.club/netease/song/detail?ids=" + e.className;
    lrcURL = "//api.kcn3388.club/netease/lyric?id=" + e.className;

    fetchsong();

    function fetchsong() {
        fetch(musicURL + cookie)
            .then(response => response.json())
            .then(result => {
                musicData = result;
                if (musicData.code === 200) {
                    httpsurl = musicData.data[0].url.splice(4, "s");
                    // console.log(httpsurl)
                    fetchlrc();
                }
            });
    }

    function fetchdetails() {
        fetch(detailURL + cookie)
            .then(response => response.json())
            .then(result => {
                detailData = result;
                if (detailData.code === 200) {
                    const ap1 = new APlayer({
                        element: document.getElementById('pageplayer'),
                        autoplay: false,
                        mutex: true,
                        preload: 'metadata',
                        audio: [{
                            name: detailData.songs[0].name,
                            artist: detailData.songs[0].ar[0].name,
                            lrcType: 1,
                            url: httpsurl,
                            cover: detailData.songs[0].al.picUrl,
                            lrc: s_lyric,
                            theme: '#ebd0c2'
                        }]
                    });
                }
            });
    }

    function fetchlrc() {
        fetch(lrcURL + cookie)
            .then(response => response.json())
            .then(result => {
                lrcData = result;
                if (lrcData.code === 200) {
                    if (lrcData.nolyric === true)
                        s_lyric = "No lyric";
                    else
                        s_lyric = lrcData.lrc.lyric;

                    fetchdetails();
                }
            });
    }
}