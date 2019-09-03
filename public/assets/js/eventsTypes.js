const createCard = (container, event) => {
    const card = `
                        <div class="s-wrapper centralized">
                            <div class="quote-wrapper">
                            <a href="/events/type/${event.event_type}"><h1 class="title">${event.event_type}</h1></a>
                                <p class="subtitle"> ${event.description} </p>
                            </div>

                            <div id="slider-container" class="container">
                                <div id="slider" class="carousel slide">
                                    <ol class="carousel-indicators">
                                        <li data-target="#slider" data-slide-to="0" class="active"></li>
                                        <li data-target="#slider" data-slide-to="1"></li>
                                        <li data-target="#slider" data-slide-to="2"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="/images/event-type/${event.event_type}01.jpg" alt="First slide">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/images/event-type/${event.event_type}02.jpg" alt="Second slide">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/images/event-type/${event.event_type}03.jpg" alt="Third slide">
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>

                            <hr class="hr">

                            <h4 class="footcard">Click <a href="/events/type/${event.event_type}">here</a> to get to the list of events of this type taking place in
                                this festival!</h4>
                        </div>
                 `
    container.innerHTML += card;
}

const onEventsTypesLoad = async () => {
    try {
        await createCards();
    } catch (e) {
        console.log(e);
    }
}

const createCards = async () => {
    const container = document.getElementById("container");
    var types = (await get(URLS.EVENT_TYPE, 100)).response;
    for (var i = 0; i < types.length; i++)
        createCard(container, types[i]);
}

onEventsTypesLoad();