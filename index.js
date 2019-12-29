const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const jwtDecode = require("jwt-decode");

const app = express();

const PORT = config.PORT || 8084;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/:loginProvider/token", async (req, res) => {
  const { id_token } = req.body;
  const { loginProvider } = req.params;

  const decoded = jwtDecode(id_token);

  /** DECODED VALUE **/
  /** WHEN WE ARE SAVING IN DATABASE AS PRIMARY KEY WE SHOULD CHOOSE SUB NOT EMAIL!**/
  /*
  {
  iss: 'https://accounts.google.com',
  azp: '485384751641-hs5p4qg0hijqvqrpfepu308acdc2l0ae.apps.googleusercontent.com',
  aud: '485384751641-u5onae6gq1iohi7p73kmiqsiqbap400h.apps.googleusercontent.com',
  sub: '107237721826157383481',
  hd: 'realmadrid.com',
  email: 'lukamodric@realmadrid.gmail',
  email_verified: true,
  name: 'Luka Modric',
  picture: 'https://lh3.googleusercontent.com/-JL9_CjLw1c0/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfWgqM56VdJVvHr320kActByPE8vg/s96-c/photo.jpg',
  given_name: 'Luka',
  family_name: 'Modric',
  locale: 'en',
  iat: 1577655389,
  exp: 1577658989
}*/
  let data;
  const currentTime = new Date().getTime();
  /** AS GOOGLE RECOMMEND HERE WE CHECK IF DECODED ISS IS GOOGLE, IF CLIENT ID IS SAME AS DECODED ID AND IS TOKEN
 EXPIRATION TIME GREATER THEN CURRENT TIME. THIS IS IMPORTANT VALIDATION CHECK.  
**/
  if (
    loginProvider === "google" &&
    decoded.iss === config.GOOGLE_ISS &&
    decoded.aud === config.GOOGLE_CLIENT_ID &&
    decoded.exp < currentTime
  ) {
    data = decoded;
  }
  if (data) {
    const token = jwt.sign(data.email, config.JWT_SECRET, {});
    const responseObj = {
      email: data.email,
      name: data.name,
      token
    };
    res.send(responseObj);
  }
});

app.listen(PORT, () => console.log("Example app listening on port" + PORT));
