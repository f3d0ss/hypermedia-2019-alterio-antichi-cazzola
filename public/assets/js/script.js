var post = (url, body) => new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
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
const byId = id => document.getElementById(id);
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
    if (localStorage.getItem("token")) {
        const loginBtn = document.getElementById("login-btn");
        loginBtn.innerHTML = "logout";
        loginBtn.setAttribute("href", "/#")
        loginBtn.onclick = () => {
            localStorage.removeItem("token");
            location.reload();
        }
    }
}

onLoad();