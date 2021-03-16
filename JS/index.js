butter.init({
    wrapperId: 'butter',
    wrapperDamper: 0.07
});


window.onscroll = navFloat


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

    if (window.scrollY > 740) { 
        phones[1].style.animation = 'slideup 0.7s ease 0s 1 forwards' 
    }
    if (window.scrollY > 1450) { 
        phones[2].style.animation = 'slideup 0.7s ease 0s 1 forwards' 
    }
}
scrollAnims()


