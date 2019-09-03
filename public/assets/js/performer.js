const addvent = event => 
{
    var html = 
        `
            <a href=${"/events/" + event.id}>
                <img class="round-img" src="/images/HarryPotter.jpg">
            </a>
            <p class="wheat-item">${event.name}</p>
        `;
    byId("eventsContainer").innerHTML += html;
}

const onPerformerLoad = async () =>
{
    try
    {
        const performerID = UrlLastPart;
        const performer = (await get(URLS.PERFORMER + "/" + performerID, 100)).response[0];


        byId("followName").innerHTML = `Follow ${ byId("title").innerHTML = byId("name").innerHTML = byId("name2").innerHTML = performer.name } on social media!`;
        byId("moreAbout").innerHTML = `More about ${performer.name}`;
        byId("findAuthor").innerHTML = `Find ${performer.name} Performing in: `;
        byId("description").innerHTML = performer.detail;
        byId("age").innerHTML = "  " + performer.age;
        byId("birth").innerHTML = "   " + performer.birth;
        byId("cit1").innerHTML = performer.cit1;
        byId("cit2").innerHTML = performer.cit2;
        setupEvents(performerID);
    }
    catch(e) { console.log(e); }
}

const setupEvents = async id => 
{
    const events = (await get(URLS.EVENT + "/performer/" + id, 100)).response;
    for(var i=0; i < events.length; i++)
        addvent(events[i]);
}

onPerformerLoad();