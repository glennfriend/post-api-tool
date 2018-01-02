//import domUtil from './common/domUtility.js';
//import defaultPage from './page/default.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import hljs from 'highlight.js/lib/highlight.js';
import 'highlight.js/styles/ir-black.css';
import './main.css';
import main from './main.js';


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
            base.contentType = "application/json;charset=UTF-8";
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
                if (obj && obj.error) {
                    // console.log('%c' + JSON.stringify(obj.error.message) ,'color:red');
                    console.log('%cError' ,'color:red');
                }
                else if (obj) {
                    console.log('%c' + resultType ,'color:green');
                }

                // console.log(obj)
                console.log(JSON.stringify(obj, null, 2));
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




window.$ = $;
window.main = main;
window.app = app;
window.getBase = getBase;
window.hljs = hljs;
