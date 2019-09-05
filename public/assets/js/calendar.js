const createCard = (container, events) => 
{
    var card = `
    <div class="d-flex flex-row justify-content-center">
            <div class="card">
                <div class="card-header text-center">
                    <h2 class="title">${events[0].date}</h2>
                </div>
                <div class="card-body">
                    <hr class="line"> ` ;
    for(var i=0; i < events.length; i++)
        card += `<h3><a class="card-link" href="${events[i].link}">${events[i].name} </a><span class="date"> -   ${events[i].start} - ${events[i].end} </span></h3>`;
    card += `
                        </div>
                    </div>
                </div>
            `;
    container.innerHTML += card;
}

const onCalendarLoad = async () => 
{
    try
    {
        await createCards();
    }
    catch(e) { console.log(e); }
}

const eventsByDate = (date, events) => 
{
    const ret = [];
    const toDel = [];
    for(var i=0; i < events.length; i++)
        if(events[i].date == date)
        {
            ret.push(events[i]);
            toDel.push(events[i]);
        }
    for(var i=0; i < toDel.length; i++)
        for(var j=0; j < events.length; j++)
            if(events[j] === toDel[i])
            {
                events.splice(j, 1);
                break;
            }
    return ret;
}

const newEvent = (name, date, start, end, link) =>
{
    return {
        link: link,
        name: name,
        date: date,
        start: start,    
        end: end
    }
}

const joinLists = (events, seminars) =>
{
    const ret = [];
    for(var i=0; i < events.length; i++)
        ret.push(newEvent(events[i].name, events[i].date.substring(0,10), events[i].start, events[i].end, "/events/" + events[i].id));
    for(var i=0; i < seminars.length; i++)
        ret.push(newEvent(seminars[i].title, seminars[i].date.substring(0,10), seminars[i].start, seminars[i].end, "/seminars/" + seminars[i].id));
    return ret;
}

const createCards = async () =>
{
    const container = document.getElementById("container");

    var events = (await get(URLS.EVENT, 100)).response;
    var seminars = (await get(URLS.SEMINAR, 100)).response;

    var tot = joinLists(events, seminars);
    console.log(tot);
    
    while(tot.length > 0)
        createCard(container, eventsByDate(tot[0].date, tot));
}

onCalendarLoad();

