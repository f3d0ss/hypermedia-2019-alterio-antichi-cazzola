const addvent = event => {
    var html =
        `
            <a href=${"/events/" + event.id}>
                <img class="round-img" src="/images/HarryPotter.jpg">
            </a>
            <p class="wheat-item">${event.name}</p>
        `;
    byId("eventsContainer").innerHTML += html;
}

const onPerformerLoad = async () => {
    try {
        const performerID = UrlLastPart;
        const performer = (await get(URLS.PERFORMER + "/" + performerID, 100)).response[0];

        byId("headImage").innerHTML = `<img src="${performer.photos.pop()}" class="performer-img"></img>`
        byId("followName").innerHTML = `Follow ${ byId("title").innerHTML = byId("name").innerHTML = byId("name2").innerHTML = performer.name } on social media!`;
        byId("moreAbout").innerHTML = `More about ${performer.name}`;
        byId("findAuthor").innerHTML = `Find ${performer.name} Performing in: `;
        byId("description").innerHTML = performer.detail;
        byId("age").innerHTML = "  " + performer.age;
        byId("birth").innerHTML = "   " + performer.birth;
        if (performer.achievements && performer.achievements.length > 0) {
            const achievementPane = byId("achievements");
            achievementPane.innerHTML = `<span class="font-weight-bold">Achivements:</span><ul>`;
            for (let i = 0; i < performer.achievements.length; i++) {
                achievementPane.innerHTML += `<li>${performer.achievements[i]}</li>`;
            }
            achievementPane.innerHTML += `</ul>`;
        }
        setupEvents(performerID);
        byId("slider").innerHTML = createCarousel(performer.photos);
    } catch (e) {
        console.log(e);
    }
}

const setupEvents = async id => {
    const events = (await get(URLS.EVENT + "/performer/" + id, 100)).response;
    for (var i = 0; i < events.length; i++)
        addvent(events[i]);
}

onPerformerLoad();