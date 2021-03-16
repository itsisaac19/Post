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
}

