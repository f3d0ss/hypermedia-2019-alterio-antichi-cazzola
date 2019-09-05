const onReservationInfoLoad = () =>
{
    try
    {
        if(!token)
        {
            const link = byId("link");
            if(!token)
            {
                link.href = "#";
                link.onclick = () =>
                {
                    localStorage.setItem("redirect", "/reservations");
                    location.href = "/login";
                }
            }
        }              
    }
    catch(e){ console.log(e); }
}

onReservationInfoLoad();