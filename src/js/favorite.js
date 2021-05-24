String.prototype.splice = function (start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (favURL) == "undefined") {
    var favURL
    var favData
    var httpsurl
    var listmusicData
    var listmusicURL
    var loginData
    var loginURL
    var alist = new Array()
    var urls = new Array()
    var lrcs = new Array()
}

loginURL = "//api.kcn3388.club/netease/login/login?email=" + window.atob("a2NuMzM4OEAxMjYuY29t") + "&md5_password=1723e79b321daddbcfcb0ead23309120&timestamp=" + Date.now()

login();

function login() {
    fetch(loginURL)
        .then(response => response.json())
        .then(result => {
            loginData = result;
            if (loginData.code == 200) {
                fetchfav();
            }
        });
}

const getfavloop = async () => {
    for (var i = 0; i < favData.playlist.tracks.length; i++) {
        listmusicURL = "//api.kcn3388.club/netease/song/url?id=" + favData.playlist.tracks[i].id;
        fetchlistsong();
        lrcURL = "//api.kcn3388.club/netease/lyric?id=" + favData.playlist.tracks[i].id
        fetchlrc();
        await sleep(5);
        if (i == favData.playlist.tracks.length - 1) {
            insertfavloop();
        }
    }
}

function insertfavloop() {
    for (var i = 0; i < favData.playlist.tracks.length; i++) {
        alist[i].lrc = lrcs[i];
        alist[i].url = urls[i];
        if (i == favData.playlist.tracks.length - 1)
            genAPlayer();
    }
}

function fetchfav() {
    favURL = "//api.kcn3388.club/netease/playlist/detail?id=" + musiclist + "&cookie=" + loginData.cookie
    fetch(favURL)
        .then(response => response.json())
        .then(result => {
            favData = result;
            if (favData.code == 200) {
                for (var i = 0; i < favData.playlist.tracks.length; i++) {
                    alist.push({
                        name: favData.playlist.tracks[i].name,
                        artist: favData.playlist.tracks[i].ar[0].name,
                        cover: favData.playlist.tracks[i].al.picUrl
                    });
                }
                getfavloop();
            }
        });
}

function fetchlistsong() {
    fetch(listmusicURL)
        .then(response => response.json())
        .then(result => {
            listmusicData = result;
            if (listmusicData.code == 200) {
                if (listmusicData.data[0].url != null) {
                    httpsurl = listmusicData.data[0].url.splice(4, "s");
                    urls.push(httpsurl);
                }
                else {
                    urls.push(null);
                }
            }
        });
}

function fetchlrc() {
    fetch(lrcURL)
        .then(response => response.json())
        .then(result => {
            lrcData = result;
            if (lrcData.code == 200) {
                if (lrcData.nolyric == true || lrcData.lrc == null)
                    lrcs.push("No lyric");
                else
                    lrcs.push(lrcData.lrc.lyric);
            }
        });
}

function genAPlayer() {
    const ap1 = new APlayer({
        element: document.getElementById('favlist'),
        autoplay: false,
        fixed: true,
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