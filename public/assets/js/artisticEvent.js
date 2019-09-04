const addIcon = (container, name, link) => {
    var performerHtml =
        `
                <div class="artist-box">
                    <a href="${link}">
                        <img class="artist-img" src="/images/HarryPotter.jpg">
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
              <button id="bookBtn" type="button" class="btn btn-dark">Book to the Event!</button>
            </div>
        `;
    byId("bottomContainer").innerHTML = buttonHTML;
}

const addReservedLabel = () => {
    var reservedHTML =
        `
                    <div class="col text-center">
                        <h1><span class="badge badge-info">RESERVED</span></h1>
                    </div>
                `;
    byId("bottomContainer").innerHTML = reservedHTML;
}

const addSeminarBox = seminar => {
    var html =
        `
            <div id="seminarContainer" class="centralized  artist-wrapper">                                    
                <h3 class="wheat-item">Want to know more about this event? Check the <a id="s-link"
                href="${"/seminars/" + seminar.id}">${seminar.title}</a></h3>
            </div>
        `;
    byId("seminarContainer").innerHTML = html;
}

const onArtisticEventLoad = async () => {
    try {
        const id = UrlLastPart;
        const event = (await get(URLS.EVENT + "/" + id, 1)).response;
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

    const date = event.date.substring(0, 10);
    var eventsSameDate = (await get(URLS.EVENT + "/date/" + date, 100)).response;

    for (var i = 0; i < performers.length; i++)
        addIcon(featuringContainer, performers[i].name, "/performers/" + performers[i].id);
    for (var i = 0; i < eventsSameDate.length; i++)
        addIcon(eventsContainer, eventsSameDate[i].name, "/events/" + eventsSameDate[i].id);
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
    bookBtn.onclick = () => token ? bookTheEvent(id) : goTo("/login");
}

onArtisticEventLoad();