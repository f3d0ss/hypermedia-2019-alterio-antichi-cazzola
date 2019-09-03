const createCard = (container, seminar) => {
    var card =
        `
             <div class="s-wrapper centralized">
                <div class="quote-wrapper">
                    <h1> <a href="/seminars/${seminar.id}" class="title">${seminar.title}</a></h1>
                    <p class="subtitle"> ${seminar.abstract}</p>
                </div>

                <hr class="hr">
                `
    card +=
        `
            </div>
            `
    container.innerHTML += card;
}

const onSeminarLoad = async () => {
    try {
        await createCards();
    } catch (e) {
        console.log(e);
    }
}

const createCards = async () => {
    const container = document.getElementById("container");
    var seminars = (await get(URLS.SEMINAR, 100)).response;
    for (var i = 0; i < seminars.length; i++) {
        createCard(container, seminars[i]);
    }
}

onSeminarLoad();