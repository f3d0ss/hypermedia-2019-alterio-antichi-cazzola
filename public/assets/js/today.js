const addEvent = event =>
{
    var html =
        `
            <div class="d-flex flex-row justify-content-center">
                <div class="card">
                    <div class="card-header centralized">
                        <h2><a class="title" href="/events/${event.id}">${event.name}</a></h2>
                        <h4 class="subtitle">${event.event_type} - ${event.start}</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-center">
                            <img src="images/HarryPotter.jpg">
                        </div>
                    </div>
                </div>
            </div>
        `
    byId("eventsContainer").innerHTML += html;
}

const addLabel = () =>
{
    byId("eventsContainer").innerHTML = 
                            `
                                <div class="d-flex flex-row justify-content-center">
                                    <h3>Nothing for today..  <a class ="text-info" href = "/calendar"> Click here to go to the Calendar <a/></h3>
                                </div>
                            `
}

const onTodayLoad = () =>
{
    try
    {
        byId("today").innerHTML = `${curDay} ${curMonth} ${curYear}, All Events`;   
        setupEvents();
    }
    catch(e){ console.log(e); }
}

const setupEvents = async () =>
{
    const events = (await get(URLS.EVENT + "/date/" + curDate, 100)).response;
    //const events = (await get(URLS.EVENT + "/date/" + "2019-12-11", 100)).response;
    
    if(events.length > 0)
        for(var i=0; i < events.length; i++)
            addEvent(events[i]);
    else    
        addLabel();
}

onTodayLoad();