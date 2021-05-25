String.prototype.splice = function (start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (recURL) == "undefined") {
    var recURL
    var recData
    var httpsurl
    var recmusicData
    var recmusicURL
    var loginData
    var alist = new Array()
    var urls = new Array()
    var lrcs = new Array()
}

login();

function login() {
    fetch(window.atob(encrypted) + Date.now(),
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8;' }
        })
        .then(response => response.json())
        .then(result => {
            loginData = result;
            if (loginData.code == 200) {
                fetchrec();
            }
        });
}

const getrecloop = async () => {
    for (var i = 0; i < recData.data.dailySongs.length; i++) {
        listmusicURL = "//api.kcn3388.club/netease/song/url?id=" + recData.data.dailySongs[i].id;
        fetchrecsong();
        lrcURL = "//api.kcn3388.club/netease/lyric?id=" + recData.data.dailySongs[i].id
        fetchreclrc();
        await sleep(5);
        if (i == recData.data.dailySongs.length - 1) {
            insertrecloop();
        }
    }
}

function insertrecloop() {
    for (var i = 0; i < recData.data.dailySongs.length; i++) {
        alist[i].lrc = lrcs[i];
        alist[i].url = urls[i];
        if (i == recData.data.dailySongs.length - 1)
            genAPlayer();
    }
}

function fetchrec() {
    recURL = "//api.kcn3388.club/netease/recommend/songs?cookie=" + loginData.cookie
    fetch(recURL)
        .then(response => response.json())
        .then(result => {
            recData = result;
            if (recData.code == 200) {
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
    fetch(recmusicURL)
        .then(response => response.json())
        .then(result => {
            recmusicData = result;
            if (recmusicData.code == 200) {
                httpsurl = recmusicData.data[0].url.splice(4, "s");
                urls.push(httpsurl);
            }
        });
}

function fetchreclrc() {
    fetch(lrcURL)
        .then(response => response.json())
        .then(result => {
            lrcData = result;
            if (lrcData.code == 200) {
                if (lrcData.nolyric == true)
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