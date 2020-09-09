/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  let render = "";
  for (const tweet of tweets) {
    render += createTweetElement(tweet);
  }
  return render;
};

const createTweetElement = function(tweet) {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  let $tweet = `<article class="tweet"> 
  <header>
  <img class="small-avatar" src="${avatars}"><p>${name}</p><span class="handle">${handle}</span>
  </header>
  <p>${text}</p>
  <footer>10 days ago</footer>
  </article>`;
  return $tweet;
};

$(document).ready(function() {
  const tweetsSection = document.getElementById("tweets-container");
  const tweet = document.getElementsByClassName("tweet");
  const textBox = document.getElementsByClassName("tweet-text");
  const submission = document.getElementsByClassName("tweet-btn");
  const newTweet = document.getElementsByClassName("new-tweet");
  const toggle = document.getElementsByClassName("toggle");
  const backToTop = document.getElementsByClassName("back-to-top");
  
  ////Dynamically create tweet feed
  tweetsSection.innerHTML = renderTweets(data);

  ///Expands writing box on focus
  $(textBox).on("focus", function(event) {
    $(textBox).attr("rows", 3);
  });
  // $(textBox).on("blur", function(event) {
  //   $(textBox).attr("rows", 1);
  // });

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
    console.log("running");
    // event.peventDefault();
    console.log(event);
  });


  ///Write new tweet buttons
  $(newTweet).hide();
  $(backToTop).hide();

  $(toggle).on("click", function(event) {
    $(newTweet).toggle("slow");
  });

  $(window).scroll(function() {
    $(backToTop).show();
    $(newTweet).hide();
  });

  $(backToTop).on("click", function(event) {
    $(window).scrollTop(0);
    $(backToTop).hide();
    $(newTweet).show();
  });
});