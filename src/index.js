import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'highlight.js/styles/ir-black.css';
import './main.css';
import pageLoader from './common/pageLoader.js';
import $ from 'jquery';
import hljs from 'highlight.js/lib/highlight.js';


/**
 *
 */
var getBase = function(type, params)
{
    let base = {
        description: null,
        api: null,
        method: type,
        contentType: null,
        data: null
    };

    // auto set
    switch (type) {
        case "post":
            base.contentType = "application/json; charset=UTF-8";
            break;
        case "get":
            break;
        default:
    }

    // custom set
    if (params.description) base.description = params.description;
    if (params.api)         base.api         = params.api;
    if (params.data)        base.data        = params.data;

    //
    return base;
};


/**
 * app 處理資料送出的
 */
const app = (function()
{
    // --------------------------------------------------------------------------------
    //  private
    // --------------------------------------------------------------------------------
    var config = {
        basePath: '//' + location.hostname + '/wms/admin',
    };

    // --------------------------------------------------------------------------------
    //  public
    // --------------------------------------------------------------------------------
    var obj = {

        run: function(rows, index=0)
        {
            let row = rows[index];
            let showTitle = (rows.length > 1 ) ? index + 1 : "START";

            if (row) {
                console.log(`---------- ${showTitle} ----------`);
                console.log(`${row.description}`);
            }
            else {
                console.log(`---------- END ----------`);
                return;
            }

            $.ajax({
                cache: false,
                type: row.method,
                url: config.basePath + row.api,
                data: JSON.stringify(row.data),
                contentType: row.contentType,
                dataType: 'json',
                beforeSend: function(xhr) {}
            })
            .done(function(obj, resultType) {
                let color = 'color:green';
                if (obj && obj.error) {
                    // console.log('%c' + JSON.stringify(obj.error.message) ,'color:red');
                    // console.log('%cError' ,'color:red');
                    color = 'color:red';
                }
                else if (obj) {
                    // console.log('%c' + resultType ,'color:green');
                }

                // console.log(obj);
                console.log('%c' + JSON.stringify(obj, null, 2), color);
                app.run(rows, index+1);
            })
            .fail(function(obj, resultType) {
                console.log('%c Fail !!' ,'color:red');
                console.log(resultType);
                console.log(obj);
            });

        },

    };

    return obj;
})();


// --------------------------------------------------------------------------------
// init
// --------------------------------------------------------------------------------
$(function() {

    pageLoader.menuLoad();

    if (! location.hash) {
        location.hash = 'console/console';
    }
    if (-1 === location.hash.indexOf('/')) {
        return;
    }

    $(window).on('hashchange', function() {
        pageLoader.load(location.hash);
    });
    pageLoader.load(location.hash);

});


// --------------------------------------------------------------------------------
// to public
// --------------------------------------------------------------------------------
window.$ = $;
window.pageLoader = pageLoader;
window.app = app;
window.getBase = getBase;
window.hljs = hljs;
