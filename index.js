// Welcome Page 
function onLoad () {
    document.querySelector('.google').addEventListener('click', function() {
        auth('google')
    }) 
    document.querySelector('.outlook').onclick = authOutlook
}
onLoad()


function auth (client) {
    localStorage.setItem('client', client);
    window.location.href = 'messages.html'
}


// Authenticate for Outlook

function authOutlook () {

}