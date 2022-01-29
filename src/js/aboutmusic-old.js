String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
if (typeof (recURL) == "undefined") {
    var recURL
    var recRequest = new XMLHttpRequest;
    var recData
    var httpsurl
    var newmusicRequest = new XMLHttpRequest;
    var newmusicData
    var newmusicURL
    var loginRequest = new XMLHttpRequest;
    var loginData
    var loginURL
    var index
}

loginURL = "//api.kcn3388.club/netease/login/login?email=kcn3388@126.com&md5_password=1723e79b321daddbcfcb0ead23309120&timestamp=" + Date.now()

loginRequest.onreadystatechange = function () {
    if (loginRequest.readyState == 4 && loginRequest.status == 200) {
        loginData = JSON.parse(loginRequest.responseText);
        // console.log(loginData)
        recURL = "//api.kcn3388.club/netease/recommend/songs?cookie=" + loginData.cookie
        recRequest.open('GET', recURL);
        recRequest.send();
    }
}

loginRequest.open('POST', loginURL);
loginRequest.send();

newmusicRequest.onreadystatechange = function () {
    if (newmusicRequest.readyState == 4 && newmusicRequest.status == 200) {
        newmusicData = JSON.parse(newmusicRequest.responseText);
        // console.log(newmusicData.data[0]);
        httpsurl = newmusicData.data[0].url.splice(4, "s");
        // console.log(httpsurl)
        const ap1 = new APlayer({
            element: document.getElementById('dailyplayer'),
            mini: false,
            autoplay: false,
            lrcType: false,
            mutex: true,
            preload: 'metadata',
            audio: [{
                name: recData.data.dailySongs[index].name,
                artist: recData.data.dailySongs[index].ar[0].name,
                url: httpsurl,
                cover: recData.data.dailySongs[index].al.picUrl,
                theme: '#ebd0c2'
            }]
        });
    }
}

recRequest.onreadystatechange = function () {
    if (recRequest.readyState == 4 && recRequest.status == 200) {
        recData = JSON.parse(recRequest.responseText);
        // console.log(recData.data.dailySongs[0])
        index = randomNum(0, recData.data.dailySongs.length-1)
        newmusicURL = "//api.kcn3388.club/netease/song/url?id=" + recData.data.dailySongs[index].id
        newmusicRequest.open('GET', newmusicURL);
        newmusicRequest.send();
    }
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