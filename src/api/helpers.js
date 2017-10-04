import axios from "axios";

const ENV = process.env.NODE_ENV;

console.log(ENV);

const url = (ENV === 'development' ? "http://localhost:8081" : "https://react-web-services.herokuapp.com/");

export default {

  login: function(user) {
    console.log(user);
    return axios.post(url + "/api/user/login/", user);
  },
  posthome: function(home) {
    return axios.post(url + "/api/pics/upload/", home);
  },

  getpics: function() {
    return axios.get(url + "/api/pics/getlistings");
  }
};
