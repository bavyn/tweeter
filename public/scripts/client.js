/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  console.log('document is ready');

  // grab the tweet container section
  const $tweetSection = $(`.tweet-container`);

  // test tweet data to be deleted
  const tweets =  [
    {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1684799649923
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1684886049923
    }
  ];

  // grab the form
  const $form = $('#post-tweet')

  // submit form handler
  $form.on('submit', (event) => {
    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    console.log('form has been submitted');

    // url encode
    const urlEncodedString = $form.serialize();
    console.log(urlEncodedString);

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
          <span class="tweet-date">${tweet.created_at}</span>
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
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetSection.prepend($tweet);
    }
  };

  renderTweets(tweets);

});
