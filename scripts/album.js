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
    var $songRow =
            $('<tr class="album-view-song-item">' +
              '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
              '   <td class="song-item-title">' + songTitle + '</td>' +
              '   <td class="song-item-duration">' + songDuration + '</td>' +
              '</tr>');
    
    $songRow.find(".song-item-number").click(function() {
        var $this = $(this),
            songItemNumber = $this.attr("data-song-number");
        
        // No song is playing. Just play this one
        if (currentlyPlayingSong === null) {
            $this.html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        }
        // This song is playing. Pause it
        else if (currentlyPlayingSong === songItemNumber) {
            $this.html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
        // A different song is playing. Stop it and play this one
        else if (currentlyPlayingSong !== songItemNumber) {
            $("[data-song-number='" + currentlyPlayingSong + "']").html(currentlyPlayingSong);
            
            $this.html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        }
    });
    
    $songRow.hover(function() {
        var $songItem = $(this).find(".song-item-number"),
            songItemNumber = $songItem.attr("data-song-number");

        if (songItemNumber !== currentlyPlayingSong) {
            $songItem.html(playButtonTemplate);
        }
    },
    function() {
        var $songItem = $(this).find(".song-item-number"),
            songItemNumber = $songItem.attr("data-song-number");

        if (songItemNumber !== currentlyPlayingSong) {
            $songItem.html(songItemNumber);
        }
    });
    
    return $songRow;
}

function setCurrentAlbum(album) {
    "use strict";
    
    var $albumTitle = $(".album-view-title"),
        $albumArtist = $(".album-view-artist"),
        $albumReleaseInfo = $(".album-view-release-info"),
        $albumImage = $(".album-cover-art"),
        $albumSongList = $(".album-view-song-list");
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + " " + album.label);
    $albumImage.attr("src", album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (let i = 0; i < album.songs.length; i++) {
        let song = album.songs[i],
            $songRow = createSongRow(i + 1, song.title, song.duration);
        
        $albumSongList.append($songRow);
    }
}

var currentlyPlayingSong = null,
    playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>',
    pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

window.onload = function() {
    "use strict";
    
    setCurrentAlbum(albumPicasso);
};