function buildCollectionItemTemplate() {
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
    
    return $(collectionItemTemplate);
}

$(window).load(function () {
    "use strict";
    
    var $collectionContainer = $(".album-covers"),
        i;
    
    $collectionContainer.empty();
    
    for (i = 0; i < 12; ++i) {
        let $newCollectionItem = buildCollectionItemTemplate();
        
        $collectionContainer.append($newCollectionItem);
    }
});
