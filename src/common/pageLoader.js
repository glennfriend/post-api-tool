import $ from 'jquery';
import hljs from 'highlight.js/lib/index.js';


const _ = 
{
    /**
     * 排列顯示的程式碼
     *
     * 將程式程碼前面移除 4 個空白符號
     */
    collocateSourceCode: function(text)
    {
        var items = text.trim().split("\n");
        var result = [];
        for (let i in items) {
            var item = items[i];
            if ("    " === item.substr(0,4)) {
                item = item.substr(4);
            }
            result.push(item);
        }
        return result.join("\n");
    },

    /**
     * 配合頁面上的排版方式
     * 顯示 "return" button 來執行程式碼
     * 並且為程式碼上色
     *
     * 每次載入頁面都要呼叫該程式
     *
     */
    everyPageLoad: function()
    {
        // 給所有的 .js-return 一個編號
        let boxMaxId = -1;
        const boxes = document.querySelectorAll(".js-return");
        boxes.forEach(function(element) {
            boxMaxId++;
            element.id = "box_" + boxMaxId;
            //console.log(element);
        });

        // clean all pre code "\n" and space
        const codes = document.querySelectorAll(".js-return code");
        codes.forEach(function(element) {
            element.innerText = _.collocateSourceCode(element.innerText);
        });

        // 先保留 source code, 免得上色後被污染, 就無法使用了
        // 並且儲存 source code 到 textarea
        $(".js-return").each(function(){
            let id = this.id;
            let sourceCode = $(this).children("code").text();
            $(this).append(`<textarea id="${id}_source" style="display:none">${sourceCode}</textarea>`);
            $(this).children('.js-button').on('click', function(){
                var run = new Function(sourceCode);
                run();
            });
        });


        // --------------------------------------------------------------------------------
        // render button
        // --------------------------------------------------------------------------------

        // 程式碼上色
        codes.forEach(function(element) {
            hljs.highlightBlock(element);
        });

        // build "Run"
        $(".js-return").each(function(){
            let id = this.id;
            let sourceId = id + '_source';
            $(this).append('<p></p>');
            $(this).append('<input style="float:right; margin-left:5px;" type="button" class="js-button" value="Run" />');
            $(this).children('.js-button').on('click', function(){
                let textareaElement = document.getElementById(sourceId);
                let sourceCode = textareaElement.value;
                var run = new Function(sourceCode);
                run();
            });
        });

        // build "copy", copy source text to 剪貼簿
        //
        // NOTE:
        //      - 必須先顯示該 textarea, 然後選取, 才能進行復製
        //      - 如果該 element 的 style.display 是 none 則無法進行複製
        //
        $(".js-return").each(function(){
            let id = this.id;
            let sourceId = id + '_source';
            $(this).append(`<p></p>`);
            $(this).append(`<input style="float:right; margin-left:5px;" type="button" class="js-button" value="copy" />`);
            $(this).children('.js-button').on('click', function(){
                let copyTextarea = document.querySelector("#" + sourceId);
                copyTextarea.style.display = "inline";
                copyTextarea.select();
                try {
                    document.execCommand('copy');
                }
                catch (err) {
                    console.log('Fail: 複製內容到剪貼布 失敗 !');
                }
                copyTextarea.style.display = "none";
            });
        });

    },

};


/**
 *
 */
const pageLoader =
{

    load: function(tag, template)
    {
        if (!tag) {
            return;
        }

        if (tag.substr(0,1) == "#") {
            tag = tag.substr(1);
        }

        const file = template + tag + ".htm";
        $('#content').load(file, function(response, status, xhr){
            if (status=2000) {
                $(".js-load").each(function(){
                    if ( $(this).attr('href') == "#" + tag ) {
                        $(this).addClass("active");
                    }
                    else {
                        $(this).removeClass("active");
                    }
                });

                _.everyPageLoad();
            }
        });
    },

};

export default pageLoader;
