/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  const createTweetElement = function(data) {
    const markup = `          
      <header>
        <span>
        <img src="${escape(data.user.avatars)}">
        <span>${escape(data.user.name)}</span>
        </span>
        <span>${escape(data.user.handle)}</span>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <span>${escape(moment(new Date(data.created_at)).fromNow())}</span>
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

  // remove insecure text
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // renderTweets(data)
  const renderTweets = function(data) {
    $('#tweets-container').empty();
    for (let item of data) {
      $('#tweets-container').prepend(createTweetElement(item));
    }
  };


  //load tweets  function
  const loadTweets = function() {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };


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

  loadTweets();


  //toggle new tweet
  $('#write-tweet a').click((event) => {
    console.log(event)
    console.log('yes');
    event.preventDefault();
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

});
