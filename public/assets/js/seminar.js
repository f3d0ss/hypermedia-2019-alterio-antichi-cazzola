const addEvent = (container, event) => {
    var eventLine =
        `
                    <div class="d-flex flex-row justify-content-center">
                        <h3> <a href = "${"/events/" + event.id}"> <span class="field">${event.name}: </span><span class="parameter">${event.start + "  " + event.end}</span> </a></h3>
                    </div>
                `;
    container.innerHTML += eventLine;
}

const onSeminarLoad = async () => {
    try {
        const id = UrlLastPart;
        const seminar = (await get(URLS.SEMINAR + "/" + id, 1)).response;

        setupEvents(seminar);
        byId("title").innerHTML = byId("seminarNameH1").innerHTML = byId("seminarName").innerHTML = seminar.title;
        byId("seminar-desc").innerHTML = seminar.abstract;
    } catch (e) {
        console.log(e);
    }
}

const setupEvents = async seminar => {
    const container = byId("eventsBox");
    const events = (await get(URLS.EVENT + "/seminar/" + seminar.id, 100)).response;
    for (var i = 0; i < events.length; i++)
        addEvent(container, events[i]);
}

onSeminarLoad();