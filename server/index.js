const express = require('express');
const helmet = require('helmet')
const metautil = require('./utils/metadata');
var url = require('url');

const fs = require('fs');
const path = require('path');
const parse = require('node-html-parser').parse;
const JSONBig = require('json-bigint');
const { BigNumber } = require('bignumber.js');
const { MEDIA_URL, SC_API_KEY, SC_API_URL } = require('./utils/helper');
const fetch = require('node-fetch');
var app = express();

//app.use(helmet.frameguard()); 
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

app.use(express.static('./dist'));

app.get('/post/:postId', async (req, res) => {
  doProcessPostReq(req, res);
});

app.get('/live/:postId', async (req, res) => {
  doProcessPostReq(req, res);
});

app.get('/channel/:channelId', async (req, res) => {
  fetchMetaTag(req, res);
})

app.get('/u/:userName', async (req, res) => {
  fetchMetaTag(req, res);
})

app.get('/login', async (req, res) => {
  fetchMetaTag(req, res);
})

app.get('/register', async (req, res) => {
  fetchMetaTag(req, res);
})

// app.get('/email-unsubscribe/:env/:userId', async (req, res) => {
//   const { env, userId } = req.params;
//   if (userId) {
//     const data = await unsubscribeEmail(env, {userId});
//     if( data.result === 'Success') {
//       res.send('You have unsubscribed successfully.');
//       return;
//     }
//   }
//   res.send('Something wrong, please contact contact@safechat.com');
// });

function renderDefault(req, res) {
  const htmldata = fs.readFileSync(path.join(__dirname, '/dist/index.html'), 'utf8');
  res.end(htmldata);
}

app.use('/', (req, res) => {
  renderDefault(req, res);
});


const port = 4000;
var server = require('http').Server(app);
server.listen(port, '0.0.0.0');
console.log(`Listening on port ${port}`);
