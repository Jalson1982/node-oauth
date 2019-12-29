const axios = require("axios");

function getData(url) {
    return axios.get(url)
      .then(res => {
        return res.data;
      }).catch(err => err);
}

module.exports = getData;