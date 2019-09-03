var post = (url, body, auth) => new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if(auth)
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    var json = JSON.stringify(body);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE)
            xhr.status === 201 || xhr.status === 200 ? resolve(xhr) : reject(xhr);
    }
    xhr.send(json);
});

var get = (url, pageSize) => new Promise((resolve, reject) => {
    url = url + '?pageSize=' + pageSize;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    var status = xhr.status;
    xhr.onload = () => xhr.status == 200 ? resolve(xhr) : reject(xhr);
    xhr.send();
});

const token = localStorage.getItem("token");
const UrlLastPart = location.href.substring(location.href.lastIndexOf('/') + 1);
const goTo = url=>  window.location.href = url;
const byId = id => document.getElementById(id);

const getTokenPayload = () => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

var userID = null;

var BASEold = 'http://localhost:3000/api/v1';
var BASE = '/api/v1';
var URLS = {
    COMPANY: BASE + '/company',
    PERFORMER: BASE + '/performer',
    LOCATION: BASE + '/location',
    SEMINAR: BASE + '/seminar',
    EVENT_TYPE: BASE + '/event-type',
    EVENT: BASE + '/event',
    RESERVATION: BASE + '/reservation',
    SIGNUP: BASE + '/auth/signup',
    LOGIN: BASE + '/auth/login'
}

const onLoad = () => {
    if (token) {
        const loginBtn = document.getElementById("login-btn");
        loginBtn.innerHTML = "logout";
        loginBtn.setAttribute("href", "/#")
        loginBtn.onclick = () => {
            localStorage.removeItem("token");
            location.reload();
        }
        userID = getTokenPayload().sub;
    }
}

onLoad();