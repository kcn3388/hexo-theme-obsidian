var OriginTitile = document.title;
var st;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = "(つェ⊂)我藏好了哦";
        clearTimeout(st);
        console.log('hide');
    } else {
        document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
        console.log('show');
        st = setTimeout(function() {
            document.title = OriginTitile;
        }, 4000);
        console.log('endChange=');
    }
});