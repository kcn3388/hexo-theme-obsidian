var OriginTitile = document.title;
var st;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = "(つェ⊂)我藏好了哦";
        clearTimeout(st);
    } else {
        document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
        st = setTimeout(function() {
            document.title = OriginTitile;
        }, 4000);
    }
});