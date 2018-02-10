import axios from "axios";

axios.defaults.headers.common['Authorization'] = (localStorage.getItem('casaToken') || '');

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

  //send search object to retrieve homes
  searchForHomes: function(searchObj){
    return axios.post(url + "/api/pics/searchlistings", searchObj)
  },

  //get autocomplete from google
  autocomplete: function(input){
    return axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&language=en&key=AIzaSyAKSwpmylLQXawpmn7_JeF_mH44PmUyzq8`);
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
