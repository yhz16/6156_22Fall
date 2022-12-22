// Fill in your client ID and client secret that you obtained
// while registering the application
const clientID = '42537773772d769bf66c'
const clientSecret = 'af7490c0295b7ad2169897707d32cd48147421f2'

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const axios = require('axios');

const app = new Koa();

const main = serve(path.join(__dirname));

const oauth = async ctx => {
  const requestToken = ctx.request.query.code;
  console.log('client_id:', clientID);
  console.log('client_secret:', clientSecret);
  console.log('authorization code:', requestToken);

  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });
  console.log(`get response`);

  const accessToken = tokenResponse.data.access_token;
  console.log(`access token: ${accessToken}`);

  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  console.log(result.data);
  const name = result.data.login;

  // ctx.response.redirect(`http://onlinemuseum.s3-website-us-east-1.amazonaws.com/home.html?name=${name}`);
  ctx.response.redirect(`/home.html?name=${name}`);
};

app.use(main);
app.use(route.get('/oauth/redirect', oauth));

app.listen(8080);
