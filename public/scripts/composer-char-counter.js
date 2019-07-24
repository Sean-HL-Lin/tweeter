$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet textarea').on('keyup', function() {
    const count = $(this).val().length;
    const counterObj = $(this).parent().children('span');
    const limit = 140;
    counterObj.text(() => {
      const rest = limit - count;
      if (rest < 0) {
        counterObj.css('color', 'red');
      }
      return limit - count;
    });
  });

  $(window).scroll(() => {
    if ($('header').visible()) {
      $('#to-top').removeClass('display-to-top');
      $('#write-tweet').removeClass('show-tweet-form');
    } else {
      $('#to-top').addClass('display-to-top');
      $('#write-tweet').addClass('show-tweet-form');
    }
  });

  $('#to-top').click(() => {
    $('.new-tweet').slideDown();
    $('.new-tweet textarea').focus();
  });


});