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

Array.prototype.forEach.call(document.querySelector('.navouter').children, function(el) {
    el.addEventListener('click', function() {
        if (this.innerHTML == "Post") {
            window.location.href = 'index.html'
            return;
        }
        var link = this.innerHTML.replace(/\s/g,'-')
        window.location.href = link + '.html'
    })
}) 