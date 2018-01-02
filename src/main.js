import $ from 'jquery';
import hljs from 'highlight.js/lib/index.js';




const main = {

    /**
     *  每次載入頁面都要呼叫該程式
     */
    everyPageLoad: function ()
    {
        // clean all pre code "\n" and space
        $(".js-return code").each(function(){
            var text = $(this).text();
            $(this).text(
                main.collocateSourceCode(text)
            );
        });

        // render
        // 先保留 source code, 免得上色後被污染, 就無法使用了
        $(".js-return").each(function(){
            var sourceCode = $(this).children("code").text();
            $(this).append('<p></p>');
            $(this).append('<input style="float:right" type="button" class="js-button" value="return" />');
            $(this).children('.js-button').on('click', function(){
                var run = new Function(sourceCode);
                run();
            });
        });

        // 程式碼上色
        $('.js-return code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    },

    collocateSourceCode: function(text)
    {
        var items = text.trim().split("\n");
        var result = [];
        for ( var i in items ) {
            var item = items[i];
            if ("    "===item.substr(0,4)) {
                item = item.substr(4);
            }
            result.push(item);
        }
        return result.join("\n");
    },

    load: function(tag, template)
    {
        if (!tag) {
            return;
        }

        if (tag.substr(0,1) == "#") {
            tag = tag.substr(1);
        }

        var file = template + tag + ".htm";
        $('#content').load(file, function(response, status, xhr){
            if (status=2000) {
                $(".js-load").each(function(){
                    if ( $(this).attr('href') == "#"+tag ) {
                        $(this).addClass("active");
                    }
                    else {
                        $(this).removeClass("active");
                    }
                });

                main.everyPageLoad();
            }
        });
    },

};

export default main;
