var collectionItemTemplate =
    '<div class="collection-album-container column fourth">' +
    '    <img src="assets/images/album_covers/01.png"/>' +
    '    <div class="collection=album-info caption">' +
    '        <p>' +
    '            <a class="album-name" href="album.html">The Colors</a>' +
    '            <br/>' +
    '            <a href="album.html">Pablo Picasso</a>' +
    '            <br/>' +
    '            X songs' +
    '            <br/>' +
    '        </p>' +
    '    </div>' +
    '</div>';

window.onload = function () {
    "use strict";
    
    var collectionContainer = document.querySelector(".album-covers"),
        i;
    
    collectionContainer.innerHeight = "";
    
    for (i = 0; i < 12; ++i) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
};