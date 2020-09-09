
$(document).ready(function() {
  const textBox = document.getElementsByClassName("tweet-text");
  const submission = document.getElementsByClassName("tweetform");
  
  $(textBox).on("keyup", function(event) {
    const counter = $(this).parent().find("output")[0];
    const remChar = 140 - (this.value.length);
    counter.innerText = remChar;
    
    remChar < 0 ? $(counter).css("color", "red") : $(counter).css("color", "#545149");
  });

  $(submission).submit(function(event) {
    const counter = $(this).find("output")[0];
    counter.innerText = 140;
  });
});


