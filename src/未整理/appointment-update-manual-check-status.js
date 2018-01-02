
var data = [
    {
        "api": "/crmAms/appointmentAjax/updateManualCheckStatus",
        "method": "post",
        "headers": {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8',
        },
        "data": {
            "appointment": {
                "id": 1,
            },
        },
    },
];

// debug only
// utils.dump(data); exit;

module.exports = data;

// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------
