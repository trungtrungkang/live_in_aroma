
var JSONbig = require('json-bigint');
var axios = require('axios').default;

const conf = {
  qa: {
    token: 'AgNvAAAAAAAAAADQ5fyKlLcQAAAAAD4tDmAAAAAAAACNGJHshJr3E8c218c5iPvA95PpKA==',
    hostSM: 'https://qasm.safechat.com'
  },
  prodsc: {
    token: 'AgNvAAAAAAAAAADQ5fyKlLcQAAAAAJgtDmAAAAAAAADeM5eRSnC12UOsM3v2cx1EyAnMgA==',
    hostSM: 'https://sm.safechat.com',
  }
}

function call(host, version, service, command, token, params) {
  var body = JSONbig.stringify({
    token: token,
    version: version,
    service: service,
    command: command,
    params: params
  });

  return axios.post(`${host}/${version}/${service.toLowerCase()}/${command.toLowerCase()}`, body, {
    transformResponse: null,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    var data = JSONbig.parse(res.data);
    if (data.error) return;
    return data.result;
  }).catch(e => { });
};

exports.unsubscribeEmail = (env, { key = 'aioundsr874t7sjksnfd', userId, value = true }) => {
  return call(conf[env].hostSM, 'v1', 'social', 'unsubscribeEmail', conf[env].token, { key, userId, value })
}