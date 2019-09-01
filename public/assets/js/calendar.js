const createCard = (container, events) => 
{
    var card = `
    <div class="d-flex flex-row justify-content-center">
            <div class="card">
                <div class="card-header">
                    <h2 class="title">${events[0].date}</h2>
                </div>
                <div class="card-body">
                    <hr class="line"> ` ;
    for(var i=0; i < events.length; i++)
        card += `<h3><a class="card-link" href="#">${events[i].name} </a><span class="date">- starts: ${events[i].start}   ends: ${events[i].end} </span></h3>`;
    card += `
                        </div>
                    </div>
                </div>
            `;
    container.innerHTML += card;
}

const onCalendarLoad = async () => 
{
    const container = document.getElementById("container");
    try
    {
        var res = await get(URLS.EVENT, 100);
        var events = res.response;
        console.log(events);
        for(var i=0; i < events.length; i++)
            events[i].date = events[i].date.substring(0,10);
        var tmpEvents = [];
        tmpEvents[0] = events[0];
        for(var i = 1; i < events.length; i++)
            if(tmpEvents.length > 0 && events[i].date === tmpEvents[0].date)
                tmpEvents.push(events[i]);
            else
            {
                createCard(container, tmpEvents);
                tmpEvents = []
                tmpEvents.push(events[i]);
            }
        createCard(container, tmpEvents);
    }
    catch(e) { console.log(e); }
}

onCalendarLoad();

