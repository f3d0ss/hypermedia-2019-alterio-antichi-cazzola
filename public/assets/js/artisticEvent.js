const addIcon = (container, name, link, image) => {
    var performerHtml =
        `
                <div class="artist-box">
                    <a href="${link}">
                        <img class="artist-img" src="${image}">
                    </a>
                    <p class="wheat-item a-name">${name}</p>
                </div>
            `;
    container.innerHTML += performerHtml;
}

const addBookBtn = () => {
    var buttonHTML =
        `
            <div class="col text-center">
              <button id="bookBtn" type="button" class="btn bookbtn btn-dark">GET YOUR TICKET</button>
            </div>
        `;
    byId("bottomContainer").innerHTML = buttonHTML;
}

const addReservedLabel = () => {
    var reservedHTML =
        `
                    <div class="col text-center">
                        <h1><span class="badge reservedLabel badge-info">RESERVED</span></h1>
                    </div>
                `;
    byId("bottomContainer").innerHTML = reservedHTML;
}

const addSeminarBox = seminar => {
    var html =
        `
            <div class="row">
                <div class="col-1"></div>
                    <div class="col-10">
                        <div class="centralized artist-wrapper">
                            <h3 class="wheat-item">Want to know more about this event? Check the <a id="s-link"
                            href="${"/seminars/" + seminar.id}">${seminar.title}</a></h3>
                        </div>
                    </div>
                <div class="col-1"></div>
            </div>
        `;
    byId("seminarContainer").innerHTML = html;
}

const getID = () =>
{
    var tmp = UrlLastPart;
    if(tmp.includes("#"))
        tmp = tmp.substring(0, tmp.indexOf("#"));
    return tmp;
}

const onArtisticEventLoad = async () => {
    try {
        var id = getID();
        const event = (await get(URLS.EVENT + "/" + id, 1)).response;
        byId("img1").src = event.photos[1];
        byId("img2").src = event.photos[2];
        byId("titleLabel").innerHTML = event.name;
        createIcons(event);
        setupQuestions(event);
        setupBottomPage(id);
        abstract.innerHTML = event.abstract;
        byId("title").innerHTML = event.name;

        byId("breadCrumbName").innerHTML = event.name;
        if (event.seminar_id) {
            const seminar = (await get(URLS.SEMINAR + "/" + event.seminar_id)).response;
            if (seminar)
                addSeminarBox(seminar);
        }
    } catch (e) {
        console.log(e);
    }
}

const setupQuestions = async event => {

    event.date = event.date.substring(0, 10);
    removeSeconds(event);
    var locationText = (await get(URLS.LOCATION + "/" + event.location_id, 100)).response.how_to_reach;
    var questions = ["What day does it take place?", `What time does it starts?`, "What time does it ends?", "How many available tickes are there?", "How can i reach the event?"];
    var answers = [`${event.date}`, `${event.start}`, `${event.end}`, `${event.vacancy}`, `${locationText}`];

    for (var i = 0; i < questions.length; i++) {
        byId("q" + i).innerHTML = questions[i];
        byId("question-" + i).innerHTML = answers[i];
    }
}

const createIcons = async event => {
    const featuringContainer = document.getElementById("featuringBox");
    const eventsContainer = document.getElementById("eventsContainer");
    const abstract = document.getElementById("abstract");

    var performers = (await get(URLS.PERFORMER + "/event/" + event.id, 100)).response;
    var companies = (await get(URLS.COMPANY + "/event/" + event.id, 100)).response;

    const date = event.date.substring(0, 10);
    var eventsSameDate = (await get(URLS.EVENT + "/date/" + date, 100)).response;

    for (var i = 0; i < companies.length; i++)
        addIcon(featuringContainer, companies[i].name, "/companies/" + companies[i].id, companies[i].photos[0]);
    for (var i = 0; i < performers.length; i++)
        addIcon(featuringContainer, performers[i].name, "/performers/" + performers[i].id, performers[i].photos[0]);
    if (!eventsSameDate || eventsSameDate.length === 0) {
        eventsContainer.innerHTML = '<h2 class="orange-title">This is the only event for today</h2>';
    }
    for (var i = 0; i < eventsSameDate.length; i++)
        addIcon(eventsContainer, eventsSameDate[i].name, "/events/" + eventsSameDate[i].id, eventsSameDate[i].photos[0]);

}

const setupBottomPage = async id => {
    if (token) {
        const reservations = (await get(URLS.RESERVATION + "/user/" + userID, 100)).response;

        for (var i = 0; i < reservations.length; i++)
            if (reservations[i].event_id == id) {
                addReservedLabel();
                return;
            }
    }

    addBookBtn();
    setupBookButton(id);
}

const bookTheEvent = async id => {
    await post(URLS.RESERVATION, {
        "eventId": id
    }, true)
    location.reload();
}

const setupBookButton = async id => {
    const bookBtn = document.getElementById("bookBtn");
    bookBtn.onclick = () =>
    {
        if(token)
            bookTheEvent(id);
        else
        {
            localStorage.setItem("redirect", "/events/" + id + "#bottomPage");
            goTo("/login");
        }
    } 
}

onArtisticEventLoad();

$(function () {
    $(".card-header").on("click", function () {
        var pId = $(this).attr("panel-id")

        $("#" + pId).toggle();
    });
});