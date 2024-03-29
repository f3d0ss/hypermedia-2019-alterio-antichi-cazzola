const addReservation = event =>
{
    var html = 
        `
            <div class="d-flex flex-row justify-content-center">
                <div class="wrapper">
                    <div class="row">
                        <div class="col">
                            <h3><a href="#">${event.name}</a></h3>
                        </div>
                        <div class="col right">
                            <button id="button-${event.id}" type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    byId("container").innerHTML += html;
}

const setupButtons = res =>
{
    console.log(res);
    for(var i=0; i < res.length; i++)
    {
        const id = res[i].id;
        byId("button-" + res[i].event_id).onclick = async () => 
        {
            await del(URLS.RESERVATION + "/" + id,{}, true);
            location.reload();
        }
    }
}

const addHint = () =>   
{
    byId("container").innerHTML = 
                `
                    <div class="d-flex flex-row justify-content-center">
                        <h3>Are you looking for an event? <a class ="text-info" href = "/eventsTypes"> Click here to explore.. <a/></h3>
                    </div>
                `
}

const onReservationsLoad = async () =>
{
    try
    {
        if(!token)
            location.href = "/login";
        const res = (await get(URLS.RESERVATION + "/user/" + userID, 100)).response;
        if(res.length > 0)
        {
            const events = [];
            for(var i=0; i < res.length; i++)
                events.push((await get(URLS.EVENT + "/" + res[i].event_id, 100)).response);

            for(var i=0; i < events.length; i++)
                addReservation(events[i]);
            setupButtons(res);
        }
        else
            addHint();
    }
    catch(e) { console.log(e); }
}

onReservationsLoad();