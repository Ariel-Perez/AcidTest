$(document).ready(initializeTypeAhead);
$(document).on('page:load', initializeTypeAhead);

function initializeTypeAhead() {
    $('#query').on('input', updateArtist);

    $('#query').on('keydown', function(e) {
        if (e.which == 9) {
            $('#query').val($('#query-hint').attr('original-value'));
            $('#query-hint').val($('#query-hint').attr('original-value'));
            updateArtist();
            e.preventDefault();
        }
    });
}

function updateArtist() {
    var queryArtist = $('#query').val();

    $.ajax({
      url: 'http://ws.spotify.com/search/1/artist',
      data: {
        q: 'artist:' + queryArtist
      },
      success: function(data, status, jqXHR) {
        var foundArtist = $(data).find('artist')[0];
        updateAlbums(queryArtist, foundArtist);
      }
    });
}

function updateAlbums(queryArtist, foundArtist) {
    if(foundArtist != undefined) {
        $('#results-title').text('Álbumes de ' + $(foundArtist).find('name')[0].innerHTML);
        $.ajax({
            url: 'https://ws.spotify.com/lookup/1/',
            data: {
              uri: $(foundArtist).attr('href'),
              extras: 'albumdetail'
            },
            success: function(data, status, jqXHR) {
                // Sort descending
                var albums = $(data).find('album').sort(function(a, b) {
                    yearA = a.getElementsByTagName('released')[0].innerHTML;
                    yearB = b.getElementsByTagName('released')[0].innerHTML;
                    return -(yearA - yearB);
                });
                $('#results').empty();

                albums.each(function(i, a) {
                    console.log(a);
                    $('<a/>', {
                        class: "list-group-item",
                        href: "#",
                        text: $(a).find('name')[0].innerHTML
                    }).appendTo('#results');
                });
            }
        });
    }
    else {
        $('#results-title').text('Artista no encontrado...');
    }
}

function insertAlbum(album_list, artist_id, album, year) {
    /*$($(album).find('artist')[0]).attr('href');
    if(album_list[year] != undefined) {
        if (album_list[year][album] == undefined) {
            
        }
    }
    else {
        album_list[year] = { album: true };
    }*/
}