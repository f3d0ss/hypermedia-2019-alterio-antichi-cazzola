const N = 20;

var EventTypeNames = [ "dance", "opera", "theater", "music"];

var companyPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.COMPANY,  // post can be found in script.js
        {
            "name": "The Best Company" + i+1,
            "detail": "This is a company of dances",
            "photos": [
                "/images/1234" + i
            ]
        })
}

var performerPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.PERFORMER,  // post can be found in script.js
            {
                "name": "Mario Rossi" + i,
                "achivments": [
                  "Grade"
                ],
                "detail": "Mario is a fucking dancer and I dunno why the fuck I'm writing...",
                "company_id": i,
                "photos": [
                  "/images/first-photo.png" + i
                ]
            });
};

var locationPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.LOCATION,  // post can be found in script.js
            {
                "id": "A" + i,
                "how_to_reach": "After you pass the enterence you find the place in front of you"
            });
}

var seminarPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.SEMINAR,  // post can be found in script.js
            {
                "title": "Amazing seminar" + i,
                "location_id": "A" + i,
                "date": "2019-08-15",
                "start": "12:00:00",
                "abstract": "this is an abstract",
                "end": "21:00:00",
                "vacancy": 15
            });
}

var newEventType = (name, description) => { return {event_type: name, description: description} };

var eventTypePost = async () => 
{
    for(var i=0; i < EventTypeNames.length; i++)
        await post(URLS.EVENT_TYPE, newEventType(EventTypeNames[i], EventTypeNames[i] + " description"));
}

var eventPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.EVENT,  // post can be found in script.js
            {
                "name": "Best event evah" + i,
                "abstract": "This is a useless description of the event",
                "date": "2019-12-1" + i%10,
                "start": "12:00:00",
                "end": "21:00:00",
                "location_id": "A" + i,
                "vacancy": 30,
                "seminar_id": i,
                "performer_ids": [
                  i
                ],
                "event_type": EventTypeNames[i%4]
            });
}

var signupPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.SIGNUP,  // post can be found in script.js
            {
                "email": "example" + i + "@mail.com",
                "password": "khIH&*5VGk%RFk)0QedHy"
            });
}

var loginPost = async () => 
{
    for(var i=1; i < N; i++)
        console.log(await post(URLS.LOGIN,  // post can be found in script.js
            {
                "email": "example" + i + "@mail.com",
                "password": "khIH&*5VGk%RFk)0QedHy"
            }));
}

var reservationPost = async () => 
{
    for(var i=1; i < N; i++)
        await post(URLS.RESERVATION,  // post can be found in script.js
            {
                "userId": i,
                "eventId": i
            });
}

var main = async () =>
{
    try
    {
        await companyPost();
        await locationPost();
        await seminarPost();
        await eventTypePost();
        await performerPost();
        await eventPost();
        await signupPost();
        await loginPost();
        //await reservationPost();
    }
    catch(e) { console.log(e, "culissimo"); }
}

main();