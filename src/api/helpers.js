import axios from "axios";

const ENV = process.env.NODE_ENV;

console.log(ENV);

//const url = (window.location.href.indexOf('localhost') > -1 ? "http://localhost:8081" : "https://react-web-services.herokuapp.com");

const url = `https://react-web-services.herokuapp.com`

export default {

  login: function(user) {
    return axios.post(url + "/api/user/login/", user);
  },

  register: function(user){
    return axios.post(url + "/api/user/register/", user);
  },

  posthome: function(home) {
    return axios.post(url + "/api/pics/upload/", home);
  },

  getpics: function() {
    return axios.get(url + "/api/pics/getlistings");
  },

  getMessages: function(id){
    return axios.get(url + "/api/messages/getmessage?id=" + id);
  },

  postMessage: function(message){
    return axios.post(url + "/api/messages/postmessage", message);
  }
};
