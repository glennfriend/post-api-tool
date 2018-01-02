var data = [
    {
        "description": "get a attachment",
        "api": "/attachment/attachmentFileAjax/getByUuid",
        "method": "post",
        "headers": {
            'Content-type': 'application/json'
        },
        "data": {
            'uuid': '6e5dcc2f-fdf0-56a2-913e-a1c2370719fc',
        }
    },
];

module.exports = data;

// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------




/* --------------------------------------------------------------------------------
how to upload file?

use PostMan by google extension

setting
    POST to /attachment/attachmentFileAjax/upload
    TYPE is form-data
    name is "file"
-------------------------------------------------------------------------------- */

