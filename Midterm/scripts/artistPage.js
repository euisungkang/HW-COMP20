const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {
  fetch("data/artists.json").then(res => {
    return res.json()
  }).then(data => {
    const name = urlParams.get('name')
    for (var i = 0; i < data.artist.length; i++) {
      if (data.artist[i].id == name) {
        return(data.artist[i]);
      }
    }
  }).then(artist => {
    console.log(artist);
    document.getElementById("artistProfile").src = artist.profile;
    document.getElementById("name").innerHTML = artist.name;

    albumdiv = $('#albumdiv');
    var buffer;
    for (var i = 0; i < artist.albums.length; i++) {
      buffer = '<figure><img src = "' + artist.albums[i].cover +
              '" class="album" /><figcaption>' + artist.albums[i].album_name +
              '<br/>' + artist.albums[i].year_release + '</figure>';
      albumdiv.append(buffer);
    }
    albumdiv.append('<br/>');
  }).catch(err => {
    console.log(err);
  })
});