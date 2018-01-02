try {
    var data = require('./config.json');
}
catch (err) {
    console.log("Require Config Data Error:");
    console.log("============================");
    console.log(err);
    console.log("============================");
    return;
}

var scheme = 'http';
if (data.dev_server_ssl) {
    scheme = 'https';
}

module.exports = {
    'app_name': data.app_name,
    'is_ssl':   data.dev_server_ssl,
    'host_url': scheme + '://' + data.dev_server_host + ':' + data.dev_server_port,
    'host':                      data.dev_server_host + ':' + data.dev_server_port,
};
