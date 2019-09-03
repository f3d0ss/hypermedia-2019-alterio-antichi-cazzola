const addIcon = (container, name, link) =>
{
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

const onArtisticEventLoad = async () =>
{
    try
    {
        const id = UrlLastPart;
        const event = (await get(URLS.EVENT + "/" + id, 1)).response;
        const seminar = (await get(URLS.SEMINAR + "/" + event.seminar_id)).response;
        createIcons(event);
        setupBookButton();
        abstract.innerHTML = event.abstract;
        byId("title").innerHTML = event.name;
        byId("breadCrumbName").innerHTML = event.name;
        var seminariLink = byId("s-link");
        seminariLink.innerHTML = seminar.title;
        seminariLink.setAttribute("href", "/seminars/" + seminar.id);
    }
    catch(e) { console.log(e); }
}

const createIcons = async event =>
{
    const featuringContainer = document.getElementById("featuringBox");
    const eventsContainer = document.getElementById("eventsContainer");
    const abstract = document.getElementById("abstract");

    var performers = (await get(URLS.PERFORMER + "/event/" + event.id, 100)).response;

    const date = event.date.substring(0,10);
    var eventsSameDate = (await get(URLS.EVENT + "/date/" + date, 100)).response;

    for(var i=0; i < performers.length; i++)
        addIcon(featuringContainer, performers[i].name, "#");
    for(var i=0; i < eventsSameDate.length; i++)
        addIcon(eventsContainer, eventsSameDate[i].name, "#");
 }

const setupBookButton = async () =>
{
    const bookBtn = document.getElementById("bookBtn");
    if(token)
    {
    }
    else
    {
    }
}

onArtisticEventLoad();