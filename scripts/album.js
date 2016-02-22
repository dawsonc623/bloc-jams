var albumPicasso = {
        "title": "The Colors",
        "artist": "Pablo Picasso",
        "label": "Cubism",
        "year": "1881",
        "albumArtUrl": "assets/images/album_covers/01.png",
        "songs": [{
            "title": "Blue",
            "duration": "4:26"
        }, {
            "title": "Green",
            "duration": "3:14"
        }, {
            "title": "Red",
            "duration": "5:01"
        }, {
            "title": "Pink",
            "duration": "3:21"
        }, {
            "title": "Magenta",
            "duration": "2:15"
        }]
    },
    albumMarconi = {
        "title": "The Telephone",
        "artist": "Guglielmo Marconi",
        "label": "EM",
        "year": "1909",
        "albumArtUrl": "assets/images/album_covers/20.png",
        "songs": [{
            "title": "Hello, Operator?",
            "duration": "1:01"
        }, {
            "title": "Ring, Ring, Ring",
            "duration": "5:01"
        }, {
            "title": "Fits in Your Pocket",
            "duration": "3:21"
        }, {
            "title": "Can You Hear Me Now?",
            "duration": "3:14"
        }, {
            "title": "Wrong Phone Number",
            "duration": "2:15"
        }]
    },
    albumSnapper = {
        "title": "The Snap",
        "artist": "Red Snapper",
        "label": "SNP",
        "year": "1985",
        "albumArtUrl": "assets/images/album_covers/14.png",
        "songs": [{
            "title": "Snap Your Fingers",
            "duration": "2:14"
        }, {
            "title": "I've Got the Snap",
            "duration": "3:52"
        }, {
            "title": "Make It Snappy",
            "duration": "4:03"
        }, {
            "title": "She's Gonna Snap",
            "duration": "3:27"
        }, {
            "title": "Snap, Crackle, and...",
            "duration": "2:49"
        }]
    };

function createSongRow(songNumber, songTitle, songDuration) {
    return  '<tr class="album-view-song-item">' +
            '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
            '   <td class="song-item-title">' + songTitle + '</td>' +
            '   <td class="song-item-duration">' + songDuration + '</td>' +
            '</tr>';
}

function setCurrentAlbum(album) {
    "use strict";
    
    var albumTitle = document.querySelector(".album-view-title"),
        albumArtist = document.querySelector(".album-view-artist"),
        albumReleaseInfo = document.querySelector(".album-view-release-info"),
        albumImage = document.querySelector(".album-cover-art"),
        albumSongList = document.querySelector(".album-view-song-list");
    
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + " " + album.label;
    albumImage.setAttribute("src", album.albumArtUrl);
    
    albumSongList.innerHTML = "";
    
    for (let i = 0; i < album.songs.length; i++) {
        let song = album.songs[i];
        
        albumSongList.innerHTML += createSongRow(i + 1, song.title, song.duration);
    }
}

function hasClass(element, className) {
    return element.className.indexOf(className) !== -1;
}

function findParentByClassName(element, parentClassName) {
    var parent = element;
    
    do {
        parent = parent.parentNode;
    }
    while (parent && !hasClass(parent, parentClassName));
    
    return parent === element ? null : parent;
}

function getSongItem(element) {
    var songItemNumber;
    
    if (hasClass(element, "song-item-number")) {
        songItemNumber = element;
    }
    else if (hasClass(element, "album-song-button") || hasClass(element, "ion-play") || hasClass(element, "ion-pause")) {
        songItemNumber = findParentByClassName(element, "song-item-number");
    }
    else if (hasClass(element, "album-view-song-item")) {
        songItemNumber = element.querySelector(".song-item-number");
    }
    else if (hasClass(element, "song-item-title") || hasClass("song-item-duration")) {
        songItemNumber = findParentByClassName(element, "album-view-song-item").querySelector(".song-item-number");
    }
    
    return songItemNumber;
}

function clickHandler(targetElement) {
    var songItem = getSongItem(targetElement);
    
    // No song is playing. Just play this one
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    }
    // This song is playing. Pause it
    else if (currentlyPlayingSong === songItem.getAttribute("data-song-number")) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    }
    // A different song is playing. Stop it and play this one
    else if (currentlyPlayingSong !== songItem.getAttribute("data-song-number")) {
        var currentlyPlaysingSongItem = document.querySelector("[data-song-number='" + currentlyPlayingSong + "']");
        currentlyPlaysingSongItem.innerHTML = currentlyPlaysingSongItem.getAttribute("data-song-number");
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    }
}

var currentlyPlayingSong = null,
    songListContainer = document.querySelector(".album-view-song-list"),
    songRows,
    playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>',
    pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

window.onload = function() {
    "use strict";
    
    var albumArt = document.querySelector(".album-cover-art"),
        albums = [albumPicasso, albumMarconi, albumSnapper],
        index = 0;
    
    albumArt.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index++]);
        songRows = document.getElementsByClassName("album-view-song-item");
        
        for (let i = 0; i < songRows.length; i++) {
            let songRow = songRows[i];
            
            songRow.addEventListener("mouseleave", function(event) {
                var songItem = getSongItem(event.target),
                    songItemNumber = songItem.getAttribute("data-song-number");
                
                if (songItemNumber !== currentlyPlayingSong) {
                    songItem.innerHTML = songItemNumber;
                }
            });
            
            songRow.addEventListener("click", function(event) {
                clickHandler(event.target);
            });
        }
        
        index %= albums.length;
    });
    
    albumArt.dispatchEvent(new MouseEvent("click"));
    
    songListContainer.addEventListener("mouseover", function(event) {
        if (event.target.parentElement.className === "album-view-song-item") {
            var songItem = getSongItem(event.target),
            songItemNumber = songItem.getAttribute("data-song-number");

            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });
};