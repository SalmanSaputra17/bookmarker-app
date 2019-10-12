const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('site-name').value;
    const siteUrl = document.getElementById('site-url').value;

    if ( !validateForm(siteName, siteUrl) ) {
        return false;
    }
    
    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    // localStorage
    localStorage.setItem('test', 'Hello World !');
    localStorage.getItem('test');
    localStorage.removeItem('test');
    */

    if ( localStorage.getItem('bookmarks') === null ) {
        // membuat array penampung
        let bookmarks = [];
        // menambahkan item kedalam array    
        bookmarks.push(bookmark);
        // menyimpan kedalam localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // mengecek apakah di localStorage sudah ada bookmark
        let localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // menyimpan bookmark kedalam array
        localBookmarks.push(bookmark);
        // simpan kembali kedalam localStorage
        localStorage.setItem('bookmarks', JSON.stringify(localBookmarks));
    }

    myForm.reset();
    fetchBookmark();

}

function fetchBookmark() {

    // mengambil semua bookmark yang ada dari localStorage
    let localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    const tampilBookmark = document.getElementById('tampilBookmark');
    
    tampilBookmark.innerHTML = '';    
    for (let i = 0; i < localBookmarks.length; i++) {
        let name = localBookmarks[i].name;
        let url = localBookmarks[i].url;

        tampilBookmark.innerHTML += '<div class="col s12 m12">'+
                                        '<div class="card z-depth-2">'+
                                            '<div class="card-content">'+
                                                '<h5>'+name+' '+
                                                    '<a class="waves-effect waves-light btn-small" target="_blank" href="'+url+'">Visit</a>'+ ' ' +
                                                    '<a onclick="deleteBookmark(\''+url+'\')" class="waves-effect waves-light btn-small red">Delete</a>'+
                                                '</h5>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';                


    }

}

function deleteBookmark(url) {

    // mengambil semua bookmark yang ada dari localStorage
    let localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    for (let i = 0; i < localBookmarks.length; i++) {
        if ( localBookmarks[i].url == url ) {
            localBookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(localBookmarks));

    fetchBookmark();

}

function validateForm(siteName, siteUrl) {
    if ( !siteName || !siteUrl ) {
        alert('Harap lengkapi form !');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if ( !siteUrl.match(regex) ) {
        alert('Masukkan url yang valid !');
        return false;
    }

    return true;
}












