let genres = [];
let songsList;

$(document).ready(() => {
  fetch("songs.json").then(res => {
    return res.json()
  }).then(data => {
    songdiv = $('#songdiv');
    songsList = data.songs
    var buffer;
    for (let i = 0; i < data.songs.length; i++) {
      buffer = '<div id = "song' + i + '"><h2>' + data.songs[i].title + '</h2><br/><p>' +
               data.songs[i].artist + '<br/>' + data.songs[i].year + '<br/>';

      for (var j = 0; j < data.songs[i].genre.length; j++) {
        buffer += data.songs[i].genre[j] + '<br/>';
        addGenre(data.songs[i].genre[j])
      }
      buffer += '</div>';
      songdiv.append(buffer);
    }
  }).then(() => {
    selectGenre = $('#genrediv');

    var buffer = '<select id = "filterGenre">';
    buffer += '<option>All</option>';
    for (var i = 0; i < genres.length; i++) {
      buffer += '<option>' + genres[i] + '</option>';
    }
    buffer += '</select>'
    selectGenre.append(buffer);
  })
});

addGenre = (genre) => {
  var need_to_add = true;
  for (var i = 0; i < genres.length; i++) {
    if (genres[i] == genre)
      need_to_add = false;
  }
  if (need_to_add)
    genres.push(genre);
}

updateList = () => {
  var selected = document.getElementById("filterGenre");
  var genre = selected.options[selected.selectedIndex].text;
  var should_be_displayed = false;

  if (genre == "All") {
    $('[id^= "song"]').show()
    return;
  }

  for (var i = 0; i < songsList.length; i++) {
    should_be_displayed = false;
    for (var j = 0; j < songsList[i].genre.length; j++) {
      if (songsList[i].genre[j] == genre)
        should_be_displayed = true;
    }
    if (should_be_displayed)
      $("#song" + i).show();
    else
      $("#song" + i).hide();
  }
}