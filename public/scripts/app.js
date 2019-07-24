
$(document).ready(function() {

    // remove insecure text
    const RemoveIllegalInput = function(str) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

  const createTweetElement = function(data) {
    const markup = `          
      <header>
        <span>
        <img src="${RemoveIllegalInput(data.user.avatars)}">
        <span>${RemoveIllegalInput(data.user.name)}</span>
        </span>
        <span>${RemoveIllegalInput(data.user.handle)}</span>
      </header>
      <p>${RemoveIllegalInput(data.content.text)}</p>
      <footer>
        <span>${RemoveIllegalInput(moment(new Date(data.created_at)).fromNow())}</span>
        <span class= 'icons'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>`;
    const tweet = $('<article>').addClass('tweet');
    tweet.html(markup);
    return tweet;
  };


  // renderTweets(data)
  const renderTweets = function(data) {
    $('#tweets-container').empty();
    for (let item of data) {
      $('#tweets-container').prepend(createTweetElement(item));
    }
  };


  //get tweets from database
  const loadTweets = function() {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };


  loadTweets();



  const editErrorMessage = function(message) {
    const markup = `<p><i class="fas fa-exclamation-triangle"></i>  ${message}  <i class="fas fa-exclamation-triangle"></i></p>`;
    return markup;
  };


  //submit form to server ----async
  $form = $('.new-tweet form');
  $form.on('submit', (event) => {
    event.preventDefault();    // $.ajax()
    const $content = $('.new-tweet textarea').val();
    const $error = $('#error-message');
    $error.slideUp();

    //check text length and sent post request
    let message = '';
    if ($content === '') {
      message = 'Context is too short';
      $error.html(editErrorMessage(message));
      $error.slideDown();
    } else if ($content.length > 140) {
      message = 'Too long, please limit input to a maximum of 140 characters';
      $error.html(editErrorMessage(message));
      $error.slideDown();
    } else {
      $error.slideUp();
      $.post('/tweets', $form.serialize(), () => {
        $form.find("input[type=text], textarea").val("");
        loadTweets();
      });
    }
  });


  //toggle new tweet
  $('#write-tweet a').click((event) => {
    event.preventDefault();
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });



});
