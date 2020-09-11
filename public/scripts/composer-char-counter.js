
$(document).ready(function() {

  
  $(".tweet-text").on("keyup", function(event) {
    const counter = $(this).parent().find("output")[0];
    const remChar = 140 - (this.value.length);
    $(counter).text(remChar);
    
    remChar < 0 ? $(counter).addClass("warning") : $(counter).removeClass("warning");
  });


  ///Set counter on submit sucessful or not
  $(".tweetform").submit(function(event) {
    const counter = $(this).parent().find("output")[0];
    const remChar = 140 - ($(this).find(".tweet-text")[0].value.length);
    $(counter).text(remChar);
    
    remChar < 0 ? $(counter).addClass("warning") : $(counter).removeClass("warning");
  });
});


