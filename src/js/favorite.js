String.prototype.splice = function (start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};

set_fav()

function set_fav(){

    if (typeof (favURL) == "undefined") {
        var favURL;
        var favData;
        var lrcURL;
        var lrcData;
        var httpsurl;
        var listmusicData;
        var listmusicURL;
        var alist = [];
        var urls = [];
        var lrcs = [];
        var cookie = "&cookie=" + atob(encrypt);
    }

    fetchfav();

    const getfavloop = async () => {
        for (var i = 0; i < favData.playlist.tracks.length; i++) {
            listmusicURL = "//api.kcn3388.club/netease/song/url?id=" + favData.playlist.tracks[i].id;
            fetchlistsong();
            lrcURL = "//api.kcn3388.club/netease/lyric?id=" + favData.playlist.tracks[i].id;
            fetchlrc();
            await sleep(5);
            if (i === favData.playlist.tracks.length - 1) {
                insertfavloop();
            }
        }
    }

    function insertfavloop() {
        for (var i = 0; i < favData.playlist.tracks.length; i++) {
            alist[i].lrc = lrcs[i];
            alist[i].url = urls[i];
            if (i === favData.playlist.tracks.length - 1)
                genAPlayer();
        }
    }

    function fetchfav() {
        favURL = "//api.kcn3388.club/netease/playlist/detail?id=" + musiclist;
        fetch(favURL + cookie)
            .then(response => response.json())
            .then(result => {
                favData = result;
                if (favData.code === 200) {
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
        fetch(listmusicURL + cookie)
            .then(response => response.json())
            .then(result => {
                listmusicData = result;
                if (listmusicData.code === 200) {
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
        fetch(lrcURL + cookie)
            .then(response => response.json())
            .then(result => {
                lrcData = result;
                if (lrcData.code === 200) {
                    if (lrcData.nolyric === true || lrcData.lrc == null)
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
}

function removelrc() {
    //检测是否存在歌词按钮
    if (!document.querySelector(".aplayer-icon-lrc"))
        return 0;
    else
    {
        //触发以后立刻移除监听
        document.removeEventListener("DOMNodeInserted",removelrc);
        //稍作延时保证触发函数时存在按钮
        setTimeout(function() {
            //以触发按钮的方式隐藏歌词，防止在点击显示歌词按钮时需要点击两次才能出现的问题
            document.querySelector(".aplayer-icon-lrc").click();
        }, 1);
        // console.log("success");
        return 0;
    }
}

document.addEventListener('DOMNodeInserted', removelrc)