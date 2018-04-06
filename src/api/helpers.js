import axios from "axios";

axios.defaults.headers.common['Authorization'] = (localStorage.getItem('casaToken') || '');

const url = (window.location.href.includes('localhost') ? "http://localhost:8081" : "https://react-web-services.herokuapp.com");

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
    return axios.post(url + "/api/property/upload/", home);
  },

  //send search object to retrieve homes
  searchForHomes: function(searchObj){
    return axios.post(url + "/api/property/searchlistings", searchObj)
  },

  //get a specific home
  getHome: (id)=>{
    return axios.get(url + `/api/property/info/${id}`)
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
