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

  //create a home listing
  posthome: function(home) {
    return axios.post(url + "/api/pics/upload/", home);
  },

  //return all pics to display
  getpics: function(id) {
    return axios.get(url + "/api/pics/getlistings?picid=" + id);
  },

  //get only pics associated with a certain email
  getPicsByUser: function(email){
    return axios.get(url + "/api/pics/getlistingsbyuser?email=" + email);
  },

  //get messages associated with a certain pic
  getMessages: function(id){
    return axios.get(url + "/api/messages/getmessage?id=" + id);
  },

  //
  getMessagesByUser: function(email, id){
    return axios.get(url + "/api/messages/getmessagesbyuser?email=" + email + "&id=" + id);
  },

  //create a message to send to another user
  postMessage: function(message){
    return axios.post(url + "/api/messages/postmessage", message);
  },

  //get the conversation associated with a certain pic
  getConvoFromListing: function(recipient, id){
    return axios.get(url + "/api/messages/getconvofromlisting?recipient=" + recipient + "&picId=" + id);
  },

  //get number of users commenting a certain pic
  getMessagesFromEachUser: function(id){
    return axios.get(url + "/api/messages/getusersbypic?id=" + id);
  }
};
