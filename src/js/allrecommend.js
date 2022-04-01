String.prototype.splice = function (start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};

set_all_rec();

function set_all_rec(){
    if (typeof (recURL) == "undefined") {
        var recURL;
        var recData;
        var lrcURL;
        var lrcData;
        var httpsurl;
        var recmusicData;
        var recmusicURL;
        var alist = [];
        var urls = [];
        var lrcs = [];
        var cookie = "?cookie=" + atob(encrypt);
        var cookie2 = "&cookie=" + atob(encrypt);
    }

    fetchrec();

    const getrecloop = async () => {
        for (var i = 0; i < recData.data.dailySongs.length; i++) {
            listmusicURL = "//api.kcn3388.club/netease/song/url?id=" + recData.data.dailySongs[i].id;
            fetchrecsong();
            lrcURL = "//api.kcn3388.club/netease/lyric?id=" + recData.data.dailySongs[i].id
            fetchreclrc();
            await sleep(5);
            if (i === recData.data.dailySongs.length - 1) {
                insertrecloop();
            }
        }
    }

    function insertrecloop() {
        for (var i = 0; i < recData.data.dailySongs.length; i++) {
            alist[i].lrc = lrcs[i];
            alist[i].url = urls[i];
            if (i === recData.data.dailySongs.length - 1)
                genAPlayer();
        }
    }

    function fetchrec() {
        recURL = "//api.kcn3388.club/netease/recommend/songs?"
        fetch(recURL + cookie)
            .then(response => response.json())
            .then(result => {
                recData = result;
                if (recData.code === 200) {
                    for (var i = 0; i < recData.data.dailySongs.length; i++) {
                        recmusicURL = "//api.kcn3388.club/netease/song/url?id=" + recData.data.dailySongs[i].id;
                        alist.push({
                            name: recData.data.dailySongs[i].name,
                            artist: recData.data.dailySongs[i].ar[0].name,
                            cover: recData.data.dailySongs[i].al.picUrl
                        });
                    }
                    getrecloop();
                }
            });
    }

    function fetchrecsong() {
        fetch(recmusicURL + cookie2)
            .then(response => response.json())
            .then(result => {
                recmusicData = result;
                if (recmusicData.code === 200) {
                    httpsurl = recmusicData.data[0].url.splice(4, "s");
                    urls.push(httpsurl);
                }
            });
    }

    function fetchreclrc() {
        fetch(lrcURL + cookie2)
            .then(response => response.json())
            .then(result => {
                lrcData = result;
                if (lrcData.code === 200) {
                    if (lrcData.nolyric === true)
                        lrcs.push("No lyric");
                    else
                        lrcs.push(lrcData.lrc.lyric);
                }
            });
    }

    function genAPlayer() {
        const ap1 = new APlayer({
            element: document.getElementById('dailyplayer'),
            autoplay: true,
            lrcType: 1,
            mutex: true,
            order: 'random',
            loop: 'all',
            listFolded: true,
            preload: 'metadata',
            audio: alist
        });
    }

    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}