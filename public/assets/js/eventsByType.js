const createCard = (container, event, performers) => {
    var card =
        `
             <div class="s-wrapper centralized">
                <div class="quote-wrapper">
                    <h1> <a href="${"/events/" + event.id}" class="title">${event.name}</a></h1>
                    <p class="subtitle"> ${event.abstract}</p>
                </div>

                <div id="slider-container" class="container">
                    
                        ` + createCarousel(event.photos, event.id) + `
    
                </div>

                <hr class="hr">

                <div class="d-flex flex-row justify-content-center">
                    <h2 class="subtitle">Featuring:</h2>
                </div>
                `
    for (var i = 0; i < performers.length; i++)
        card += `
                <div class="performer-row d-flex flex-row justify-content-center">
                    <img class="performer-img" src="${performers[i].photos[0]?performers[i].photos[0]: "/images/HarryPotter.jpg"}" alt="photo of ${performers[i].name}">
                    <h4 class="title performer-name"><a href="${"/performers/" + performers[i].id}">${performers[i].name}</a></h2>
                </div>
                `
    card +=
        `
            </div>
            `
    container.innerHTML += card;
}

const getPerformerById = async id => (await get(URLS.PERFORMER + "/" + id)).response[0];

const onEventsByTypeLoad = async () => {
    const type = location.href.substring(location.href.lastIndexOf('/') + 1);
    document.getElementById("actual-breadcrumb").innerHTML = "Events By Type " + type;
    try {
        await createCards(type);
    } catch (e) {
        console.log(e);
    }
}

const createCards = async (type) => {
    const container = document.getElementById("container");


    var events = (await get(URLS.EVENT + '/type/' + type, 100)).response;
    for (var i = 0; i < events.length; i++) {
        var performers = [];
        for (var j = 0; j < events[i].performer_ids.length; j++)
            performers.push(await getPerformerById(events[i].performer_ids[j]));
        createCard(container, events[i], performers);
    }
}

onEventsByTypeLoad();