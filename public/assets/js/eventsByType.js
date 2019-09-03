const createCard = (container, event, performers) => 
{
    var card = 
            `
             <div class="s-wrapper centralized">
                <div class="quote-wrapper">
                    <h1> <a href="${"/events/" + event.id}" class="title">${event.name}</a></h1>
                    <p class="subtitle"> ${event.abstract}</p>
                </div>

                <div id="slider-container" class="container">
                    <div id="slider1" class="carousel slide">
                        <ol class="carousel-indicators">
                            <li data-target="#slider1" data-slide-to="0" class="active"></li>
                            <li data-target="#slider1" data-slide-to="1"></li>
                            <li data-target="#slider1" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="/images/chicago.jpg" alt="First slide">
                            </div>
                            <div class="carousel-item">
                                <img src="/images/la.jpg" alt="Second slide">
                            </div>
                            <div class="carousel-item">
                                <img src="/images/ny.jpg" alt="Third slide">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#slider1" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#slider1" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <hr class="hr">

                <div class="d-flex flex-row justify-content-center">
                    <h2 class="subtitle">Featuring:</h2>
                </div>
                `
    for(var i=0; i < performers.length; i++)
        card += `
                <div class="performer-row d-flex flex-row justify-content-center">
                    <img class="performer-img" src="/images/HarryPotter.jpg">
                    <h4 class="title performer-name"><a href="#">${performers[i].name}</a></h2>
                </div>
                `
    card +=    
             `
            </div>
            `
    container.innerHTML += card;
}

const getPerformerById = async id => (await get(URLS.PERFORMER + "/" + id)).response[0];

const onEventsByTypeLoad = async () =>
{
    try
    {
        await createCards();
    }
    catch(e) {console.log(e);}
}

const createCards = async () =>
{
    const container = document.getElementById("container");
    const type = location.href.substring(location.href.lastIndexOf('/') + 1);
    
    var events = (await get(URLS.EVENT + '/type/' + type, 100)).response;
    for(var i=0; i < events.length; i++)
    {
        var performers = [];
        for(var j=0; j < events[i].performer_ids.length; j++)
            performers.push(await getPerformerById(events[i].performer_ids[j]));
        createCard(container, events[i], performers);
    }
}

onEventsByTypeLoad();