const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const postForm = require('./helpers/postForm');
const loginProviders = require('./loginProviders');
const getData = require('./helpers/getData');

const app = express();

const PORT = config.PORT || 8084;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/oauth2proxy/:loginProvider/oauth2callback", async (req, res) => {
    return res.redirect("myoauth2app://myapp.com" + req.url);
});

app.post("/oauth2proxy/:loginProvider/token", async (req, res) => {
    const { client_id, code, code_verifier, redirect_uri, grant_type } = req.body;
    const { loginProvider } = req.params;
  
    const configuration = loginProviders[loginProvider];
    const { token_endpoint, client_secret } = configuration;
  
    const response = await postForm(token_endpoint, {
      client_id,
      client_secret,
      code,
      redirect_uri,
      code_verifier,
      grant_type
    });

    const dataUrl = config.GOOGLE_CLIENT_DATA_URL+response.access_token;
    const data = await getData(dataUrl);

    const token = jwt.sign(data.email, config.JWT_SECRET, {});
    const responseObj = {
        email:data.email,
        name: data.name,
        token
    }
    res.send(responseObj);
  });

  app.listen(PORT, () => console.log("Example app listening on port 8084!"));