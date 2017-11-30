import axios from "axios";

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
    return axios.get(url + "/api/pics/getlistings/" + id);
  },

  //get only pics associated with a certain email
  getPicsByUser: function(email){
    return axios.get(url + "/api/pics/getlistingsbyuser/" + email);
  },

  //create a message to send to another user
  postMessage: function(message){
    return axios.post(url + "/api/messages/postmessage", message);
  },

  //gets all direct messages that a user is included in
  getMessages: function(userEmail){
    return axios.get(url + "/api/messages/getmessages/" +  userEmail);
  },

  //gets a specific convo from the list of messages to display
  getConvo: function(recipient, sender){
    return axios.get(url + "/api/messages/getconvo/" + recipient + "/" + sender);
  }

};
