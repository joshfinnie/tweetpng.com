# Tweet PNG

TweetPNG.com provides a super-simple API to display a tweet as an image.

[![Build Status](https://travis-ci.org/joshfinnie/tweetpng.com.svg?branch=master)](https://travis-ci.org/joshfinnie/tweetpng.com)

## How to do it...

### Getting your latest tweet

Add `http://www.tweetpng.com/:username/tweet/latest.png` to your img tag in your HTML, where `:username` is your twitter username.

### Getting your latest tweet including replies

Twitter seperated your tweets and replies into two different tabs, so TweetPNG gives you this option. Add `?withReply=true` after the URL above to get your tweets and replies. `http://www.tweetpng.com/:username/tweet/latest.png?withReply=true`

### Getting a specific tweet

Add `http://www.tweetpng.com/:username/tweet/:tweetID.png` to your img tag in your HTML, where `:username` is your twitter username. `:tweetID` is the Twitter ID of the tweet you want to use.

## Development

LastTweetPNG.com is written in `CoffeeScript` using the `Node.js` Framework. To set up your environment, follow these steps:

1 Check if you are using a 0.10.x version of Node.js.

    $ node --version
    v0.10.26

2 Install Coffeescript, Grunt-CLI and Bower globably.

    $ npm install -g coffee-script
    $ npm install -g grunt-cli
    $ npm install -g bower

Run `grunt watch` and `coffee app.coffee`.
