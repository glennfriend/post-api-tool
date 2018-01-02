//
// appointment comment 予許寫入 utf8mb4 的格式
// 但是因為 appointment cancel log 未設定為 utf8mb4
// 所以目前不建議使用這些擴充符號
//

var html = 'hello world <b>every body</b> go to <a href="https://google.com/">google</a>.';

var data = [
    {
        "api": "/crmAms/appointmentCommentAjax/add",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        "data": {
            'appointment_comment': {
                'appointment_id': '1',
                'content': html + " " + getRandomInt(1, 9),
            },
        },
    },
    {
        "api": "/crmAms/appointmentCommentAjax/add",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        "data": {
            'appointment_comment': {
                'appointment_id': '1',
                'content': "這個迴響帶有一個附件",
                'attachment_uuid': '6e5dcc2f-fdf0-56a2-913e-a1c2370719fc',
            },
        },
    }
]

// debug only
// showContents(data);

module.exports = data;

// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------
/**
 *
 */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 */
function showContents(data)
{
    var fs = require('fs');
    for (var i = 0; i < data.length; i++) {
        var pretty = JSON.stringify(data, null, 4);
        console.log('index[' + i + ']');
        console.log(pretty);
    }
}
