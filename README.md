# Tweet PNG

TweetPNG.com provides a super-simple API to display a tweet as an image.

[![Build Status](https://travis-ci.org/joshfinnie/tweetpng.com.svg?branch=master)](https://travis-ci.org/joshfinnie/tweetpng.com)

## How to do it...

### Getting a specific tweet

Add `https://tweetpng.com/:username/tweet/:tweetID.png` to your img tag in your HTML, where `:username` is your twitter username. `:tweetID` is the Twitter ID of the tweet you want to use.

## Development

TweetPNG.com is written in `Typescript` using the `Hapi.js` Framework. To set up your environment, follow these steps:

1 Check if you are using Node v12 or better.

    $ node --version
    v12.13.0

2 Install the dependencies and start the website.

    $ npm install 
    $ npm start

## Caveat Emptor

This website is not in any way guaranteed to be up and running. Twitter is notorious for changing their APIs and I built this
as a learning exercise. Do not use this API for anything where you expect or need it to work.

## Colophon

This website is written using [Typescript](https://www.typescriptlang.org/) leveraging the [Hapi](https://hapi.dev/) framework. I have adopted [Puppeteer](https://pptr.dev/) for taking the screenshots and [Jest](https://jestjs.io/) for testing. I am quite happy with these technologies at this point in time, but getting use to using Hapi over [Express](https://expressjs.com/) was a bit of a learning curve.
