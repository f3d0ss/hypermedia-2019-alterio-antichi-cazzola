const addFeaturing = (container, performer) =>
{
    var performerHtml = 
            `
                <div class="artist-box">
                    <a href="#">
                        <img class="artist-img" src="/images/HarryPotter.jpg">
                    </a>
                    <p class="wheat-item a-name">${performer.name}</p>
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
    const abstract = document.getElementById("abstract");
    const id = location.href.substring(location.href.lastIndexOf('/') + 1);

    var performers = (await get(URLS.PERFORMER + "/event/" + id, 100)).response;
    var event = (await get(URLS.EVENT + "/" + id, 1)).response;

    for(var i=0; i < performers.length; i++)
        addFeaturing(featuringContainer, performers[i]);
    abstract.innerHTML = event.abstract;
}

onArtisticEventLoad();