String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (recURL) == "undefined") {
    var recURL
    var recRequest = new XMLHttpRequest;
    var recData
    var httpsurl
    var musicRequest
    var musicData
    var musicURL
    var loginRequest
    var loginURL
}

recURL = "//api.kcn3388.club/recommend/songs"
loginURL = "//api.kcn3388.club/login/login?email=kcn3388@126.com&md5_password=1723e79b321daddbcfcb0ead23309120"

loginRequest.onreadystatechange = function () {
    if (loginRequest.readyState == 4 && loginRequest.status == 200) {
        recRequest.open('GET', recURL);
        recRequest.send();
    }
}

musicRequest.onreadystatechange = function () {
    if (musicRequest.readyState == 4 && musicRequest.status == 200) {
        musicData = JSON.parse(musicRequest.responseText);
        // console.log(musicData.data[0]);
        httpsurl = musicData.data[0].url.splice(4, "s");
        // console.log(httpsurl)
    }
}

recRequest.onreadystatechange = function () {
    if (recRequest.readyState == 4 && recRequest.status == 200) {
        recData = JSON.parse(recRequest.responseText);
        musicURL = "//api.kcn3388.club/song/url?id=" + recData.dailySongs[0].id
        musicRequest.open('GET', musicURL);
        musicRequest.send();
        // console.log(recData.dailySongs[0])
        const ap1 = new APlayer({
            element: document.getElementById('dailyplayer'),
            mini: false,
            autoplay: false,
            lrcType: false,
            mutex: true,
            preload: 'metadata',
            audio: [{
                name: recData.dailySongs[0].name,
                artist: recData.dailySongs[0].ar[0].name,
                url: httpsurl,
                cover: recData.dailySongs[0].al.picUrl,
                theme: '#ebd0c2'
            }]
        });
    }
}