const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/:username/status/:tweetId', (req, res) => {
  const { username, tweetId } = req.params
  const url = `https://twitter.com/${username}/status/${tweetId}`;
  axios.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const name = $('div .permalink-tweet-container .fullname').html();
    console.log(name);
    const time = $('div .permalink-tweet-container ._timestamp').html();
    console.log(time);
    const html = $('div .permalink-tweet-container .js-tweet-text-container').html();
    res.send(html);
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
