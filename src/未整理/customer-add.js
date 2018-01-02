var data = [
    {
        "description": "add customer",
        "api": "/crmAms/customerAjax/add",
        "method": "post",
        "headers": {
            'Content-type': 'application/json'
        },
        "data": {
            'email'            : createEmail(),
            'first_name'       : 'yyyyyy',
            'last_name'        : 'zzzzzz',
            'wedding_date'     : '2000-04-01',
            'billing_phone'    : '',
            'bride_note'       : '',
            'appointment_note' : '',
            'gender'           : 1
        }
    },
    {
        "description": "建立 customer 失敗, 因為 gender 性別 錯誤",
        "api": "/crmAms/customerAjax/add",
        "method": "post",
        "headers": {
            'Content-type': 'application/json'
        },
        "data": {
            'email'            : 'test@hotmail.com',
            'first_name'       : 'test',
            'last_name'        : 'test',
            'wedding_date'     : '2000-04-01',
            'billing_phone'    : '',
            'bride_note'       : '',
            'appointment_note' : '',
            'gender'           : 404
        }
    }
];

module.exports = data;

// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------
/**
 *
 */
function createEmail()
{
    var currentdate = new Date();
    var datetime =
            currentdate.getFullYear() + "_"
            + (currentdate.getMonth()+1)  + "_"
            + currentdate.getDate() + "."
            + currentdate.getHours() + ""
            + currentdate.getMinutes() + ""
            + currentdate.getSeconds();
    return 'just.test.' + datetime + '@local.com';
}
