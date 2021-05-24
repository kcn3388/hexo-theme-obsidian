String.prototype.splice = function (start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (favURL) == "undefined") {
    var favURL
    var favData
    var httpsurl
    var newmusicData
    var newmusicURL
    var loginData
    var loginURL
    var index
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

function fetchfav() {
    favURL = "//api.kcn3388.club/netease/playlist/detail?id=" + musiclist + "&cookie=" + loginData.cookie
    fetch(favURL)
        .then(response => response.json())
        .then(result => {
            favData = result;
            if (favData.code == 200) {
                for (index = 0; index < favData.playlist.tracks.length; index++) {
                    newmusicURL = "//api.kcn3388.club/netease/song/url?id=" + favData.playlist.tracks[index].id;
                    fetchnewsong();
                    fetchlrc();
                    alist.push({
                        name: favData.playlist.tracks[index].name,
                        artist: favData.playlist.tracks[index].ar[0].name,
                        cover: favData.playlist.tracks[index].al.picUrl
                    });
                }
            }
        });
}

function fetchnewsong() {
    fetch(newmusicURL)
        .then(response => response.json())
        .then(result => {
            newmusicData = result;
            if (newmusicData.code == 200) {
                httpsurl = newmusicData.data[0].url.splice(4, "s");
                urls.push(httpsurl);
                if (index == favData.playlist.tracks.length) {
                    var counter = index;
                    for (index = 0; index < counter; index++) {
                        alist[index].url = urls[index];
                        fetchlrc();
                    }
                }
            }
        });
}

function fetchlrc() {
    lrcURL = "//api.kcn3388.club/netease/lyric?id=" + favData.playlist.tracks[index].id
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
            
            if (index == favData.playlist.tracks.length) {
                var counter = index;
                index = 0;
                for (var i = 0; i < counter; i++) {
                    alist[i].lrc = lrcs[i];
                }
                genAPlayer();
            }
        });
}

function genAPlayer() {
    const ap1 = new APlayer({
        element: document.getElementById('favlist'),
        autoplay: true,
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