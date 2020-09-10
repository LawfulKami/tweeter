
$(document).ready(function() {
  
  $(".tweet-text").on("keyup", function(event) {
    const counter = $(this).parent().find("output")[0];///trouve method + direct
    const remChar = 140 - (this.value.length);
    $(counter).text(remChar);
    
    remChar < 0 ? $(counter).addClass("warning") : $(counter).removeClass("warning");
  });

  $(".tweetform").submit(function(event) {
    const counter = $(this).find("output")[0];
    $(counter).text(140);
  });
});


