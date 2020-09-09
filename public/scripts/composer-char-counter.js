
$(document).ready(function() {
  const textBox = document.getElementsByClassName("tweet-text");
  
  $(textBox).on("keyup", function(event) {
    console.log(this.value);
    const counter = $(this).parent().find("output")[0];
    const remChar = 140 - (this.value.length);
    counter.innerText = remChar;
    
    remChar < 0 ? $(counter).css("color", "red") : $(counter).css("color", "#545149");
  });
});


