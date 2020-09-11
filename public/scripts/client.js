
///Text Escape function
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


///// Generates Feed //////
const renderTweets = function(tweets) {
  const feed = tweets.reverse();
  let render = "";
  for (const tweet of tweets) {
    render += createTweetElement(tweet);
  }
  return render;
};

const createTweetElement = function(tweet) {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const { created_at } = tweet;
  let newtweet = `<article class="tweet"> 
  <header>
  <img class="small-avatar" src="${avatars}"><p>${name}</p><span class="handle">${handle}</span>
  </header>
  <p class="content">${escape(text)}</p>
  <footer class="tweetfooter">
  <span>${moment(created_at).fromNow()}</span>
  <div>
  <button class="icon flag"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg></button>
  <button class="icon retweet"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></button>
  <button class="icon like"><svg class="actions" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
  </div>
  </footer>
  </article>`;
  return newtweet;
};

const loadsTweets = () => {
  $.ajax({
    url: "/tweets"

  }).then(data => {
    $("#tweets-container").html(renderTweets(data));
  })
    .catch(err =>{
      console.log(err);
    });
};

const valUserInput = function(formSub) {
  const errText = $(".error-txt");
  if (!$(formSub).find("textarea").val()) {
    $(".error-txt").text("Your Tweet is empty!");
    return false;
  }
  if ($(formSub).find("textarea").val().length > 140) {
    $(".error-txt").text("Your Tweet is to Long!");
    return false;
  } else {
    return true;
  }
};


////////////
//On -Load//
////////////

$(document).ready(function() {

  loadsTweets();

  $(".error-msg").hide();//display none?
  $(".back-to-top").hide();//display none?


  ///Expands writing box on focus
  $(".tweet-text").on("focus", function(event) {
    $(".tweet-text").attr("rows", 3);
  });


  ///Submits Tweets
  $(".tweetform").submit(function(event) {
    event.preventDefault();
    const errMessage = $(this).parent().find(".error-msg");
    
    if (!valUserInput($(".tweetform")[0])) {
      $(errMessage).show();

    } else {
      $(errMessage).hide("fast");
      $.ajax("/tweets", {
        type: "POST",
        data: $(".tweetform").serialize()

      }).then((ntweet) => {
        $("#tweets-container").prepend(createTweetElement(ntweet));

      }).catch((err => {
        console.log(err);

      }));
      $(".tweet-text").attr("rows", 1);
      $(".tweet-text").val("");
    }
  });

  ///Toggle write tweet box
  $(".toggle").on("click", function(event) {
    $("#new-tweet").toggle(500, () => $(".tweet-text").focus());
  });


  $(".back-to-top").on("click", function(event) {
    $(window).scrollTop(0);
    $(".back-to-top").hide();
    $("#new-tweet").show(500, () => $(".tweet-text").focus());
  });

  
  $(window).on("scroll", () => {
    let currentPos = window.scrollY;
    if (currentPos > 400) {
      $(".back-to-top").show();
      $(".write-panel").hide();
    } else {
      $(".back-to-top").hide();
      $(".write-panel").show();
    }
  });
});