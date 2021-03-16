window.onscroll = navFloat

butter.init({
    wrapperId: 'butter',
    wrapperDamper: 0.07
});

function navFloat () {
    if (window.scrollY > 0) {
        document.querySelector('.navouter').classList.add('navfloat')
    } else {
        document.querySelector('.navouter').classList.remove('navfloat')
    }
    scrollAnims()
}

function scrollAnims () {
    var phones = document.getElementsByClassName('phone');

    if (window.scrollY > 770) { 
        phones[1].style.animation = 'slideup 0.7s ease 0s 1 forwards' 
    }
}
scrollAnims()

