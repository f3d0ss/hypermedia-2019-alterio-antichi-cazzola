const addevent = event => {
    var html =
        `
        <div class = "row event-box"> 
            <div class = "col"> 
                <a href=${"/events/" + event.id}>
                    <img class="round-img" src="${event.photos[0]}" alt="photo of event: ${event.title}">
                </a>
            </div>
            <div class = "col"> 
                <p class="wheat-item">${event.name}</p>  
            </div>
        </div>
        `;
    byId("eventsContainer").innerHTML += html;
}

const addPerformer = performer => {
    var html =
        `
        <div class="row performer-box"> 
            <div class="col"> 
                <a href="/performers/${performer.id}">
                    <img class="round-img dark" src="${performer.photos[0]}" alt="photo of ${performer.name}">
                </a>
            </div>
            <div class="col"> 
                <p class="dark-p">${performer.name}</p>  
            </div>
        </div>
        `;
    byId("performersContainer").innerHTML += html;
}

const onCompanyLoad = async () => {
    try {
        const companyID = UrlLastPart;
        const company = (await get(URLS.COMPANY + "/" + companyID, 100)).response;

        byId("headImage").innerHTML = `<img src="${company.photos[0]}" class="company-img" alt="photo of ${company.name}"></img>`
        company.photos.shift();
        byId("followName").innerHTML = `Follow ${byId("title").innerHTML = byId("name").innerHTML = byId("name2").innerHTML = company.name} on social media!`;
        byId("moreAbout").innerHTML = `More about ${company.name}`;
        byId("findAuthor").innerHTML = `Find ${company.name} Performing in: `;
        byId("description").innerHTML = company.detail;

        setUpPerformers(companyID);
        setupEvents(companyID);
        byId("slider-container").innerHTML = createCarousel(company.photos);
    } catch (e) {
        console.log(e);
    }
}

const setupEvents = async id => {
    const events = (await get(URLS.EVENT + "/company/" + id, 100)).response;
    for (var i = 0; i < events.length; i++)
        addevent(events[i]);
}
const setUpPerformers = async id => {
    const performers = (await get(URLS.PERFORMER + "/company/" + id, 100)).response;
    for (var i = 0; i < performers.length; i++)
        addPerformer(performers[i]);
}

onCompanyLoad();