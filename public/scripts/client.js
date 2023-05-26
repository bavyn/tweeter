$(document).ready(() => {

  // grab the tweet container section
  const $tweetSection = $(`.tweet-container`);

  // function to escape text to mitigate vulnerability to xss
  const safe = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function implementation
  const createTweetElement = (tweet) => {
    let $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="tweeter-info">
            <img class="post-avatar" src=${safe(tweet.user.avatars)}>
            <span>${safe(tweet.user.name)}</span>
          </div>
          <span class="username">${safe(tweet.user.handle)}</span>
        </header>
        <div class="posted-tweet">
          <p>${safe(tweet.content.text)}</p>
        </div>
        <div class="tweet-foot">
          <span class="tweet-date">${safe(timeago.format(tweet.created_at))}</span>
          <div class="tweet-actions">
            <i id="flag" class="fa-solid fa-flag"></i>
            <i id="retweet" class="fa-solid fa-retweet"></i>
            <i id="heart" class="fa-solid fa-heart"></i>
          </div>
        </div>
      </article>
    `);
    return $tweet
  };

  const renderTweets = (tweets) => {
    $tweetSection.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetSection.prepend($tweet);
    }
  };

  renderTweets([]);

  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      }
    });
  };

  loadTweets();

  // grab the form
  const $postTweet = $("#post-tweet")

  // submit form handler
  $postTweet.on('submit', (event) => {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
  
    // url encode
    const urlEncodedString = $postTweet.serialize();
  
    // error handling
    // repeating some code from char-counter .. opportunity to make this more DRY?
    const maxCount = 140;
    const currentCount = $postTweet.find("#tweet-text").val().length;
    if (!currentCount) {
      $(".validation-errors").slideUp(() => {
        $(".validation-errors").slideDown().text('You cannot post a blank tweet');
      });

      return;
    }
    if (currentCount > maxCount) {
      $(".validation-errors").slideUp(() => {
        $(".validation-errors").slideDown().text('Please reduce character count');
      });
      return;
    }
      
    // make a POST request to the server
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: urlEncodedString
    }).then(() => {
      $(".validation-errors").slideUp();
      loadTweets();
      $(".counter").text(140); // reset counter
      $postTweet.find("#tweet-text").val("");
    });
  });

});