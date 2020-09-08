

$(document).ready(function() {
  const textBox = document.getElementsByClassName("tweet-text");
  const tweet = document.getElementsByClassName("tweet");
  
  $(textBox).on("keyup", function(event) {
    console.log(this.value);
    const counter = $(this).parent().find("output")[0];
    const remChar = 140 - (this.value.length);
    counter.innerText = remChar;
    
    remChar < 0 ? $(counter).css("color", "red") : $(counter).css("color", "#545149");
  });

  $(textBox).on("focus", function(event) {
    $(textBox).attr("rows", 3);
  });
  $(textBox).on("blur", function(event) {
    $(textBox).attr("rows", 1);
  });

  $(tweet).on("mouseover", function(event) {
    const handle = $(this).find(".handle");
    $(handle).addClass("visible");
  });

  $(tweet).on("mouseout", function(event) {
    const handle = $(this).find(".handle");
    $(handle).removeClass("visible");
  });
});


