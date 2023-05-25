/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  console.log('document is ready');

  // grab the tweet container section
  const $tweetSection = $(`.tweet-container`);

  // grab the form
  const $postTweet = $("#post-tweet")

  // submit form handler
  $postTweet.on('submit', (event) => {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    console.log('form has been submitted');

    // url encode
    const urlEncodedString = $postTweet.serialize();
    console.log(urlEncodedString);

    // alert on error
    // repeating some code from char-counter .. opportunity to make this more DRY?
    const maxCount = 140;
    const currentCount = $postTweet.find("#tweet-text").val().length;
    if (!currentCount) {
      return alert('You cannot post a blank tweet');
    }
    if (currentCount > maxCount) {
      return alert('Please reduce character count');
    }
    
    // make a POST request to the server
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: urlEncodedString
    }).then(() => {
      console.log('tweet posted successfully');
    });
  });

  // function implementation
  const createTweetElement = (tweet) => {
    let $tweet = $(`
      <article class="tweet">

        <header class="tweet-header">
          <div class="tweeter-info">
            <img class="post-avatar" src=${tweet.user.avatars}>
            <span>${tweet.user.name}</span>
          </div>
          <span class="username">${tweet.user.handle}</span>
        </header>

        <div class="posted-tweet">
          <p>${tweet.content.text}</p>
        </div>

        <div class="tweet-foot">
          <span class="tweet-date">${timeago.format(tweet.created_at)}</span>
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
        console.log(tweets);
        renderTweets(tweets);
      }
    });
  };

  loadTweets();

});
