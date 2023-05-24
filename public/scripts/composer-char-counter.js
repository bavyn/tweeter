// implement charachter counter logic 
$(document).ready(function() {

  $("#tweet-text").keyup(function() {
    const theCounter = $(this).parent().find(".counter");
    const maxCount = 140;
    let currentCount = $(this).val().length;

    theCounter.text(maxCount - currentCount);

    theCounter.val() < 0 ? theCounter.css({'color':'tomato'}) : theCounter.css({'color':'#545149'})



  })

});

