const registerBtn = document.getElementById('registerBtn');
const emailText = document.getElementById('emailText');
const passText =  document.getElementById('passText');
const statusText = document.getElementById('statusText');

registerBtn.onclick = async () => 
{
    try 
    {
        await post(URLS.SIGNUP, 
        {
            email: emailText.value,
            password: passText.value
        })
        location.href = '/login';
    }
    catch(e) { statusText.innerHTML = JSON.parse(e.response).message.replace("request.body.", ""); }
}