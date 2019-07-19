$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet textarea').on('keyup', function() {
    let count = $(this).val().length;
    let counterObj = $(this).parent().children('span');
    let limit = 140;
    counterObj.text(() => {
      let rest = limit - count;
      if (rest < 0) {
        counterObj.css('color', 'red');
      }
      return limit - count;
    });
  });

  $(window).scroll(() => {
    if ($('header').visible()) {
      $('#to-top').css('display', 'none');
      $('#write-tweet').css('display', 'block');
    } else {
      $('#to-top').css('display', 'inline');
      $('#write-tweet').css('display', 'none');
    }
  });

  $('#to-top').click(() => {
    $('.new-tweet').slideDown();
    $('.new-tweet textarea').focus();
  });


});