$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet textarea').on('keyup', function() {
    let count = $(this).val().length;
    let counterObj = $(this).parent().children('span');
    let limit = 140;
    counterObj.text(() => {
      let rest =  limit - count;
      if (rest < 0 ) {
        counterObj.css('color', 'red')
      }
      return limit - count;
    })


  })

});