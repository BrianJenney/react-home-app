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

    userInfo: function(userId) {
        return axios.get(`${url}/api/user/user/${userId}`);
    },

    updateProfile: function(user) {
        return axios.post(url + "/api/user/profile/", user);
    },

    //create a home listing
    posthome: function(home) {
        return axios.post(url + "/api/property/upload/", home);
    },

    //edit an existing home
    editHome: home => {
        return axios.post(url + "/api/property/edit/", home);
    },

    //send search object to retrieve homes
    searchForHomes: function(searchObj) {
        return axios.post(url + "/api/property/searchlistings", searchObj);
    },

    //upload disclosure package
    uploadDisclosure: function(disclosureForm) {
        return axios.post(url + "/api/property/disclosure", disclosureForm);
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
    },

    //gets a list of homes by a user email
    getListingHomes: function(userEmail) {
        return axios.get(url + `/api/property/getlistingsbyuser/${userEmail}`);
    },

    //gets a list of homes by a user email
    getAllListings: function() {
        return axios.get(url + `/api/property/properties`);
    },

    //upsert offer obj
    makeOffer: function(offerObj) {
        return axios.post(`${url}/api/offers/makeoffer`, offerObj);
    },

    //get offer info for the current property
    getOfferForCurrentProperty: function(home, user) {
        const obj = { userId: user._id, homeId: home._id };

        return axios.post(`${url}/api/offers/offerinfo`, obj);
    },

    //submit offer
    submitOffer: function(home, user) {
        const obj = { userId: user, homeId: home };

        return axios.post(`${url}/api/offers/submitoffer`, obj);
    },

    //seller accept offer
    acceptOffer: function(offer) {
        return axios.post(`${url}/api/offers/acceptoffer`, offer);
    },

    //buyer accept offer
    buyerAcceptOffer: function(offer) {
        return axios.post(`${url}/api/offers/acceptoffer/buyer`, offer);
    },

    //get all offers sent to a user
    getOffers: function(user) {
        const obj = { userId: user.id };

        return axios.post(`${url}/api/offers/getoffers`, obj);
    },

    //get info about current offer being made by a buyer
    getOfferByUser: function(user, home) {
        const obj = { userId: user._id, homeId: home._id };

        return axios.post(`${url}/api/offers/offerinfo`, obj);
    },

    //get specific offer and associated house
    getOffer: id => {
        return axios.get(`${url}/api/offers/offer/${id}`);
    },

    //get offers belonging to a user for a particular home
    getOffersByUserAndHome: (userId, homeId) => {
        return axios.post(`${url}/api/offers/offerinfo`, { userId, homeId });
    }
};
