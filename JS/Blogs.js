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
}