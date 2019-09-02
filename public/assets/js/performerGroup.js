const createCard = (container, name) =>
{
    var card =
            `
                <div class="d-flex flex-row justify-content-center">
                    <div class="wrapper">
                        <div class="row">
                            <img class="performer-img" src="/images/HarryPotter.jpg" alt="First Artist">
                            <h2 class="performer-name"><a class="performer-link" href="#">${name}</a></h2>
                        </div>
                    </div>
                </div>
            `;
    container.innerHTML += card;
}

const onPerformerGroupLoad = async () =>
{
    try
    {
        await createCards();
    }
    catch(e) { console.log(e); }
}

const createCards = async () =>
{
    const performersContainer = document.getElementById("performersContainer");
    const companiesContainer = document.getElementById("companiesContainer");

    const performers = (await get(URLS.PERFORMER, 100)).response;
    const companies = (await get(URLS.COMPANY, 100)).response;

    for(var i=0; i < performers.length; i++)
        createCard(performersContainer, performers[i].name)
    for(var i=0; i < companies.length; i++)
        createCard(companiesContainer, companies[i].name)
    console.log(companiesContainer, companies);
}

onPerformerGroupLoad();