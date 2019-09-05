const emailText = document.getElementById("emailText");
const passText = document.getElementById("passText");
const loginBtn = document.getElementById("loginBtn");
const statusText = document.getElementById('statusText');
const redirect = localStorage.getItem("redirect");

loginBtn.onclick = async () =>
{
    try
    {
        var res = await post(URLS.LOGIN, 
            {
                email: emailText.value,
                password: passText.value
            });
        var token = JSON.parse(res.response).token;
        localStorage.setItem("token" , token);
        location.href = redirect ? redirect : '/';
    }
    catch(e) { statusText.innerHTML = JSON.parse(e.response).message; }
}

const onLoginLoad = () =>
{
    if(localStorage.getItem("token"))
        location.href = '/';
    if(redirect)
        localStorage.removeItem("redirect");
}

onLoginLoad();