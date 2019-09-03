const createCard = (container, name, url) => {
    var card =
        `
                <div class="d-flex flex-row justify-content-center">
                    <div class="wrapper justify-content-center">
                        <div class="row">
                        <img class="performer-img" src="/images/HarryPotter.jpg" alt="First Artist">
                            <h2 class="performer-name"><a class="performer-link" href="${url}">${name}</a></h2>
                        </div>
                    </div>
                </div>
            `;
    container.innerHTML += card;
}

const onPerformerGroupLoad = async () => {
    try {
        var title;
        var performers;

        if (UrlLastPart === "performers") {
            title = "All performers";
            performers = (await get(URLS.PERFORMER, 100)).response;
        } else {
            title = "All companies";
            performers = (await get(URLS.COMPANY, 100)).response;
        }
        await createCards(title, performers);
    } catch (e) {
        console.log(e);
    }
}

const createCards = async (title, performers) => {
    const performersContainer = byId("performersContainer");
    byId("title").innerHTML = byId("h1Title").innerHTML = byId("breadCrumbName").innerHTML = title;
    let url;
    for (var i = 0; i < performers.length; i++) {
        if (performers[i].age) {
            url = "performers/";
        } else {
            url = "companies/";
        }
        createCard(performersContainer, performers[i].name, url + performers[i].id);
    }
}

onPerformerGroupLoad();