Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var del = (url, body, auth) => new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if (auth)
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    var json = JSON.stringify(body);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE)
            xhr.status === 201 || xhr.status === 200 ? resolve(xhr) : reject(xhr);
    }
    xhr.send(json);
});

var post = (url, body, auth) => new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if (auth)
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

const removeSeconds = obj => 
{
    obj.start = obj.start.substring(0, obj.start.lastIndexOf(":"));
    obj.end = obj.end.substring(0, obj.end.lastIndexOf(":"));
}

const token = localStorage.getItem("token");
const UrlLastPart = location.href.substring(location.href.lastIndexOf('/') + 1);
const goTo = url => window.location.href = url;
const byId = id => document.getElementById(id);

const getTokenPayload = () => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
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
        document.getElementById("signup-btn").remove();
        document.getElementById("navbar-ul").innerHTML += `
            <li class="nav-item">
                <a class="nav-link wheat-item wheat-link" href="/reservations">My Reservations</a>
            </li>`;
        loginBtn.innerHTML = "Logout";
        loginBtn.setAttribute("href", "/#")
        loginBtn.onclick = () => {
            localStorage.removeItem("token");
            location.reload();
        }
        userID = getTokenPayload().sub;
    }
}

const getMonth = monthNum => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][monthNum];
const curMonth = getMonth(new Date().getMonth());
const curDay = new Date().getDay();
const curYear = new Date().getFullYear();
const curDate = new Date().toJSON().slice(0, 10);


const createCarousel = (images, id) => {
    if (!id) {
        id = "";
    }
    let html = `<div id="slider${id}" class="carousel slide"><ol class="carousel-indicators">`;
    for (let i = 0; i < images.length; i++) {
        html += `<li data-target="#slider${id}" data-slide-to="${i}" class="${i===0? "active": ""}"></li>` //class="active"
    }
    html += `</ol> <div class="carousel-inner">`;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        html += `<div class="carousel-item ${i===0? "active": ""}">
                    <img src="${image}" alt="First slide">
                </div>` //class="active"
    }
    html += `</div>
    <a class="carousel-control-prev" href="#slider${id}" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#slider${id}" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a></div>`;

    return html;
}

onLoad();

$(".burger-menu").on("click", function () {
    $(".burger-menu").toggleClass("open");
});