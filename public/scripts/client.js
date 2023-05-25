/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  console.log('document is ready');

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
    //loop thru tweets
    for (const tweet of tweets) {
    // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
      $tweetSection.prepend($tweet);
    }
  };

  renderTweets(tweets);

});