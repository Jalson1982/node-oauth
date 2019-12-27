const Config = require("./config");

module.exports = {
  // For configuration values, see https://accounts.google.com/.well-known/openid-configuration
  // For Administration, see https://console.developers.google.com/apis/credentials
  google: {
    title: "Google",
    client_id: Config.GOOGLE_CLIENT_ID,
    client_secret: Config.GOOGLE_CLIENT_SECRET,
    redirect_uri: Config.BACKEND + "/oauth2proxy/:loginProvider/oauth2callback",
    authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    token_endpoint: "https://accounts.google.com/o/oauth2/token",
    response_type: "code",
    scope: "profile email",
    grant_type: "authorization_code"
  }
};
