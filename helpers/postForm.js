const axios = require("axios");
const qs = require("qs");

function postForm(url, formData) {
  const payload = qs.stringify(formData);

  return axios.post(url, payload).then(res => res.data).catch(err => console.log(err));
}

module.exports = postForm;