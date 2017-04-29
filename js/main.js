
$(function () {
  function hideLoader() {
    $('.loader-gif').hide();
  }
  hideLoader();

  function hideSection () {
    $('.section-selector').hide();
  }
  hideSection();


  $('#sections').on('change', function () {
    $('.loader-gif').show();
    $('.stories').empty();

    var section = this.value;
    var storyString = '';
    var runs = 0;
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url += '?' + $.param({
    'api-key': '322b3247fdb14b38b38d51b8c82d9cad'
  });


    $.ajax({
      method: 'GET',
      url: url,

  }).done(function (data) {
    console.log(data);
    hideLoader();
    hideSection();

    $.each(data.results, function(index, value) {
      if (value.multimedia.length >=5 && runs < 12 ) {
        storyString+= '<li class="story-cell">' + '<a href="' + value.url + '" target="_blank">' + '<div style="background-image: url(\'' + value.multimedia[4].url + '\')" class="image-container">' + '<p>' + value.abstract + '</p>' + '</div>' + '</a>' + '</li>'
        
        // + '<div style="background-image: url(\'' + value.multimedia[4].url + '\')" class="story-image">' +
        
        
        // '<div class="story-cell" style="background-image: url(\'' + value.multimedia[4].url + '\')"><img src="' +  + '" class="story-image"><div class="story-link"><a href="' + value.url + '" target="_blank"><p class="story-abstract">' + value.abstract + '</a></p></div></div>';
        runs++;
    }
    
  })
  $('.stories').append(storyString);
  }).fail(function(){
    $('.stories').append('<p><span class="error-message">Sorry, something went wrong.</span></p>');

    });

  });

});