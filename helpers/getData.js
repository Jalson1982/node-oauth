const axios = require("axios");

function getData(url) {
    return axios.get(url)
      .then(res => {
        return res.data;
      }).catch(err => console.log(err));
}

module.exports = getData;