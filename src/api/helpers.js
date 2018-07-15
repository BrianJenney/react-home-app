import axios from "axios";

axios.defaults.headers.common["Authorization"] =
    JSON.parse(localStorage.getItem("casaToken")) || "";

const url = window.location.href.includes("localhost")
    ? "http://localhost:8081"
    : "https://react-web-services.herokuapp.com";

//testing when blocked by firewall
//const url = `https://react-web-services.herokuapp.com`

export default {
    login: function(user) {
        return axios.post(url + "/api/user/login/", user);
    },

    register: function(user) {
        return axios.post(url + "/api/user/register/", user);
    },

    //create a home listing
    posthome: function(home) {
        return axios.post(url + "/api/property/upload/", home);
    },

    //send search object to retrieve homes
    searchForHomes: function(searchObj) {
        return axios.post(url + "/api/property/searchlistings", searchObj);
    },

    //get a specific home
    getHome: id => {
        return axios.get(url + `/api/property/info/${id}`);
    },

    //create a message to send to another user
    postMessage: function(message) {
        return axios.post(url + "/api/messages/postmessage", message);
    },

    //gets all direct messages that a user is included in
    getMessages: function(userEmail) {
        return axios.get(url + `/api/messages/getmessages/${userEmail}`);
    },

    //set a message to viewed if last message is to the logged in user and message was set to viewed === false
    setMessageToViewed: function(parentId, messageId) {
        return axios.post(url + "/api/messages/messageviewed", {
            parentId,
            messageId
        });
    },

    //gets a specific convo from the list of messages to display
    getConvo: function(recipient, sender) {
        return axios.get(url + `/api/messages/getconvo/${recipient}/${sender}`);
    }
<<<<<<< HEAD
=======

    //saves user's phone number when the upload it to the dashboard
    // phoneNumber: function(file) {
    //     return axios.post(file + "/api/user/profile")
    // }


>>>>>>> started an attempt at post request for user phone number
};
