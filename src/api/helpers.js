import axios from "axios";

const ENV = process.env.NODE_ENV;

console.log(ENV);

//for home testing
const url = (window.location.href.indexOf('localhost') > -1 ? "http://localhost:8081" : "https://react-web-services.herokuapp.com");

//testing when blocked by firewall
//const url = `https://react-web-services.herokuapp.com`

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

  getpics: function(id) {
    return axios.get(url + "/api/pics/getlistings?picid=" + id);
  },

  getPicsByUser: function(email){
    return axios.get(url + "/api/pics/getlistingsbyuser?email=" + email);
  },

  getMessages: function(id){
    return axios.get(url + "/api/messages/getmessage?id=" + id);
  },

  getMessagesByUser: function(email, id){
    return axios.get(url + "/api/messages/getmessagesbyuser?email=" + email + "&id=" + id);
  },

  postMessage: function(message){
    return axios.post(url + "/api/messages/postmessage", message);
  },

  getConvoFromListing: function(recipient, id){
    return axios.get(url + "/api/messages/getconvofromlisting?recipient=" + recipient + "&picId=" + id);
  },

  getMessagesFromEachUser: function(id){
    return axios.get(url + "/api/messages/getusersbypic?id=" + id);
  }
};
