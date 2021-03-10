
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}

function authGoogle () {
    gapi.auth2.getAuthInstance().signIn();
}
function signout (){
    gapi.auth2.getAuthInstance().signOut();
}

// CLIENT ID : 218618575485-3ftb24lj00drabk73oangup1gputric2.apps.googleusercontent.com
// CLIENT SECRET : pvfOq3atoJcDRXKrauECXCkS
// API KEY : AIzaSyByS_D7_t49ZfK9hvvWECZlG4kusTjK9vk

var CLIENT_ID = '218618575485-3ftb24lj00drabk73oangup1gputric2.apps.googleusercontent.com';
var API_KEY = 'AIzaSyByS_D7_t49ZfK9hvvWECZlG4kusTjK9vk';

var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
]; 
   
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        ux_mode: "redirect",
        redirect_uri: "https://itsisaac19.github.io/Post/messages.html",
    }).then(
        function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },function (error) {
          console.log(JSON.stringify(error, null, 2));
        }
      );
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      listLabels();
    } else {
        if (localStorage.getItem('client') && localStorage.getItem('client') == 'google') {
            if (localStorage.setItem('countOfLoopSign')) {
                document.querySelector('.messagestext').innerHTML = 'Looping.' + "Status: " + isSignedIn
                return;
            }
            localStorage.setItem('countOfLoopSign', 1)
            authGoogle()
        } else {
            window.location.href = 'index.html'
        }
        console.log('signed out')
    }
}
   
function listLabels() {
    var wrap  = document.querySelector('.clientMessages');
    wrap.innerHTML = ''

    gapi.client.gmail.users.messages.list({
        userId: "me",
        "includeSpamTrash": false,
        "maxResults": 20
    }).then(function(response) {
        //console.log("Response", response);
        var main = response.result.messages;
   
        for(i = 0; i < 8; i++) {
            (function(i) {
                var idList = main[i].id;
    
                gapi.client.gmail.users.messages.get({
                    userId: "me",
                    "id": idList,
                    "format": "full"
                }).then(function(response) {

                    var subject;
                    response.result.payload.headers.forEach(function(item, index) {
                        if(response.result.payload.headers[index].name == 'Subject') {
                            subject = response.result.payload.headers[index].value
                        }
                    })

                    var utcOffset = Math.abs(moment().utcOffset())
                    var emailDate = moment(response.headers.date, "ddd DD MMM YYYY").subtract(utcOffset, 'minutes').format('MMM DD')

                    var labels = response.result.labelIds;

                    var snippet = response.result.snippet;

                    if(snippet.length > 70) {
                        snippet = snippet.substring(0, 70).replace(/(\r\n|\n|\r)/gm, "") + '...'
                    }

                    var bodyText;
                    if (response.result.payload.body.data) {
                        bodyText = atob(response.result.payload.body.data.replace(/-/g, '+').replace(/_/g, '/')) 
                    } else {
                        bodyText = atob(response.result.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/')) 
                    }


                    var push = messageFormat(emailDate, labels, subject, snippet)

                    if (labels[0] != "UNREAD") {
                        console.log(labels[0])
                        if (i == 7) {
                            pageInit()
                        } 
                        return;
                    } else {
                        console.log('message is unread')
                        console.log(subject, response)
                        wrap.appendChild(push)
                        if (i == 7) {
                            pageInit()
                            console.log('last')
                        } 
                    }
                    });
                }(i));
            }

    })
}

function pageInit () {
    var delay;
    setTimeout(function() {
        for (msgNum = 1; msgNum < ((document.getElementsByClassName('message').length) + 1); msgNum++) {
            (function(msgNum) {
                delay = ((msgNum*0.1) + 0.2).toFixed(2) + 's'
                console.log(delay)
                document.getElementsByClassName('message')[msgNum - 1].style.animation = 'slideup 0.3s ease ' + delay +' 1 forwards'
            }(msgNum))
        }
        var loader = document.querySelector('.loader');
        loader.style.opacity = '0'
        document.querySelector('.count').innerHTML = document.getElementsByClassName('message').length
    }, 300)


}