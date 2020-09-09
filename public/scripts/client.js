/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const renderTweets = function(tweets) {
  const feed = tweets.reverse();
  let render = "";
  for (const tweet of tweets) {
    render += createTweetElement(tweet);
  }
  return render;
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  let $tweet = `<article class="tweet"> 
  <header>
  <img class="small-avatar" src="${avatars}"><p>${name}</p><span class="handle">${handle}</span>
  </header>
  <p>${escape(text)}</p>
  <footer>10 days ago</footer>
  </article>`;
  return $tweet;
};

$(document).ready(function() {
  const tweetsSection = document.getElementById("tweets-container");
  const tweet = document.getElementsByClassName("tweet");
  const textBox = document.getElementsByClassName("tweet-text");
  const submission = document.getElementsByClassName("tweetform");
  const newTweet = document.getElementsByClassName("new-tweet");
  const toggle = document.getElementsByClassName("toggle");
  const backToTop = document.getElementsByClassName("back-to-top");
  const errMsg = document.getElementsByClassName("error-msg");

  
  const loadsTweets = () => {
    $.ajax({
      url: "/tweets"
    }).then(data => {
      tweetsSection.innerHTML = renderTweets(data);
    });
  };

  loadsTweets();
  $(errMsg).hide();
  $(backToTop).hide();
  
  

  ///Expands writing box on focus
  $(textBox).on("focus", function(event) {
    $(textBox).attr("rows", 3);
  });

  ///Highlights moused over tweets in the feed
  $(tweet).on("mouseover", function(event) {
    const handle = $(this).find(".handle");
    $(handle).addClass("visible");
  });

  $(tweet).on("mouseout", function(event) {
    const handle = $(this).find(".handle");
    $(handle).removeClass("visible");
  });

  ///Submits Tweets
  $(submission).submit(function(event) {
    event.preventDefault();
    const errMessage = $(this).parent().find(".error-msg");
    const errText = $(this).parent().find(".error-txt")[0];
    if (!submission[0].text.value) {
      $(errMessage).show("fast");
      errText.innerText = "Your Tweet is empty!";
    } else if (submission[0].text.value.length > 140) {
      $(errMessage).show("fast");
      errText.innerText = "Your Tweet is to Long!";
    } else {
      $(errMessage).hide("fast");
      $.ajax("/tweets", {
        type: "POST",
        data: $(submission).serialize()
      }).then(() => {
        loadsTweets();
      });
      $(textBox).attr("rows", 1);
      $(textBox).val("");
      $(newTweet).hide("slow");
    }
  });


  $(toggle).on("click", function(event) {
    $(newTweet).toggle("slow");
  });


  $(backToTop).on("click", function(event) {
    $(window).scrollTop(0);
    $(backToTop).hide();
    $(newTweet).show();

  });


  window.addEventListener("scroll", () => {
    let currentPos = window.scrollY;
    if (currentPos > 400) {
      $(backToTop).show();
      $(toggle).hide();
    } else {
      $(backToTop).hide();
      $(toggle).show()
    }
  });
});