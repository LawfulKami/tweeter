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
  <footer class="tweetfooter">
  <span>10 days ago</span>
  <div>
  <button class="icon flag"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg></button>
  <button class="icon retweet"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></button>
  <button class="icon like"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
  </div>
  </footer>
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
      $(errMessage).show();
      errText.innerText = "Your Tweet is empty!";
    } else if (submission[0].text.value.length > 140) {
      $(errMessage).show();
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
      $(toggle).show();
    }
  });
});