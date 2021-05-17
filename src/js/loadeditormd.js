$(function () {
    var content = window.localStorage.getItem("KEY_MD_EDITOR_CONTENT");
    window.md_base_url = window.localStorage.getItem("KEY_MD_EDITOR_BASE_URL");
    window.md_editor = editormd("editor", {
        width: "100%",
        height: "100%",
        // markdown: "xxxx",     // dynamic set Markdown text
        path : "/editormd/lib/",  // Autoload modules mode, codemirror, marked... dependents libs path
        // 整体编辑器的样式
        theme: 'dark',
        // 预览区域的样式
        previewTheme: 'dark',
        // 编辑区域的样式
        editorTheme: 'pastel-on-dark',
        toolbarIcons: function() {
            // 获取默认的所有工具名称
            var icons = editormd.toolbarModes.full;
            // 过滤掉不需要的工具
            icons = icons.filter(function (i) {return !['fullscreen', 'preview', 'emoji'].includes(i);});
            // 加入自定义的工具名
            icons.push('|', 'load_md');
            return icons;
        },
        toolbarCustomIcons: {
            load_md: '<input type="file" id="my_file" accept=".md" onchange="md_file_changed()" style="display: none;"><li><a href="javascript:#" onclick="load_md_file()" title="load md" unselectable="on"><i class="fa fa-upload" name="load_md" unselectable="on"></i></a></li>',
        },
        
    });
});
window.load_md_file = function () {
    // 点击图标，触发隐藏的<input/>标签的点击事件用以选择本地 md 文档
    $("#my_file").click();
};
window.md_file_changed = function () {
    // 获取选择到的本地文件对象，利用 HTML5 的 File API 加载其内容
    var file = document.getElementById("my_file").files[0];
    var reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = function (e) {
        // 将文档内容载入编辑器
        var fileText = e.target.result;
        window.md_editor.cm.replaceSelection(fileText);
    };
};
window.md_base_url_changed = function () {
    window.md_base_url = $("#md_base_url").val();
    // 同样利用LocalStorage保存BaseUrl输入框的值
    window.localStorage.setItem("KEY_MD_EDITOR_BASE_URL", window.md_base_url);
}
// 开启定时器，每隔10秒将编辑器中的内容保存到LocalStorage中
// 获取和设置编辑器内容的方法分别是editor.cm.getValue()和editor.cm.setValue()
setInterval(function () {
    window.localStorage.setItem("KEY_MD_EDITOR_CONTENT", window.md_editor.cm.getValue());
}, 1000 * 10);