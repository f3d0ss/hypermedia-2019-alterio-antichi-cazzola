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
        await createFeaturings();
    }
    catch(e) { console.log(e); }
}

const createFeaturings = async () =>
{
    const featuringContainer = document.getElementById("featuringBox");
    const eventsContainer = document.getElementById("eventsContainer");
    const abstract = document.getElementById("abstract");
    const id = location.href.substring(location.href.lastIndexOf('/') + 1);

    var performers = (await get(URLS.PERFORMER + "/event/" + id, 100)).response;
    var event = (await get(URLS.EVENT + "/" + id, 1)).response;

    const date = event.date.substring(0,10);
    var eventsSameDate = (await get(URLS.EVENT + "/date/" + date, 100)).response;

    console.log(date);
    console.log(eventsSameDate);
    for(var i=0; i < performers.length; i++)
        addIcon(featuringContainer, performers[i].name, "#");
    for(var i=0; i < eventsSameDate.length; i++)
        addIcon(eventsContainer, eventsSameDate[i].name, "#");
    abstract.innerHTML = event.abstract;
}

onArtisticEventLoad();