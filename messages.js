function messageFormat (date, labels, subject, snippet) {

    var pushHTML = `
    <div class="innermessage">
        <h1>`+ subject +`</h1>
        <p>`+ snippet +`</p>

        <div class="date">`+ date +`</div>

        <div class="tools">
            <span class="material-icons">reply</span>
            <span class="material-icons">archive</span>
            <span class="material-icons">delete</span>
        </div>
    </div>`

    var push = document.createElement('div');
    push.classList.add('message')
    push.innerHTML = pushHTML


    var labelwrap = document.createElement('div'); labelwrap.classList.add('labels');
    labels.forEach(function(item, index) {
        if (item.includes('UNREAD') || item.includes('INBOX') || item.includes('Label')) {
            return;
        }
        if (item.includes('CATEGORY_')) {
            item = item.replace("CATEGORY_", "")
        }

        var tmpdiv = document.createElement('div');
        tmpdiv.className = 'label';
        tmpdiv.classList.add(item)
        tmpdiv.innerHTML = item

        labelwrap.appendChild(tmpdiv)
    })

    push.children[0].appendChild(labelwrap)

    return push;
}