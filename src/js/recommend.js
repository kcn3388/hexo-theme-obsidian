String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (recURL) == "undefined") {
    var recURL
    var recData
    var httpsurl
    var recmusicData
    var recmusicURL
    var loginData
    var loginURL
    var index
    var lrcData
    var lrcURL
    var s_lyric
}

loginURL = "//api.kcn3388.club/netease/login/login?email=" + window.atob("a2NuMzM4OEAxMjYuY29t") + "&md5_password=1723e79b321daddbcfcb0ead23309120&timestamp=" + Date.now()

login();

function login() {
    fetch(loginURL)
        .then(response => response.json())
        .then(result => {
            loginData = result;
            if (loginData.code == 200) {
                fetchrec();
            }
        });
}

function fetchrec() {
    recURL = "//api.kcn3388.club/netease/recommend/songs?cookie=" + loginData.cookie
    fetch(recURL)
        .then(response => response.json())
        .then(result => {
            recData = result;
            if (recData.code == 200) {
                fetchreclrc();
            }
        });
}

function fetchrecsong() {
    recmusicURL = "//api.kcn3388.club/netease/song/url?id=" + recData.data.dailySongs[index].id
    fetch(recmusicURL)
        .then(response => response.json())
        .then(result => {
            recmusicData = result;
            if (recmusicData.code == 200) {
                httpsurl = recmusicData.data[0].url.splice(4, "s");
                // console.log(httpsurl)
                const ap1 = new APlayer({
                    element: document.getElementById('dailyplayer'),
                    autoplay: false,
                    lrcType: 1,
                    mutex: true,
                    preload: 'metadata',
                    audio: [{
                        name: recData.data.dailySongs[index].name,
                        artist: recData.data.dailySongs[index].ar[0].name,
                        lrcType: 1,
                        url: httpsurl,
                        cover: recData.data.dailySongs[index].al.picUrl,
                        lrc: s_lyric,
                        theme: '#ebd0c2'
                    }]
                });
            }
        });
}

function fetchreclrc() {
    index = randomNum(0, recData.data.dailySongs.length-1)
    lrcURL = "//api.kcn3388.club/netease/lyric?id=" + recData.data.dailySongs[index].id
    fetch(lrcURL)
        .then(response => response.json())
        .then(result => {
            lrcData = result;
            if (lrcData.code == 200) {
                if (lrcData.nolyric == true)
                    s_lyric = "No lyric";
                else
                    s_lyric =lrcData.lrc.lyric;
                fetchrecsong();
            }
        });
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}