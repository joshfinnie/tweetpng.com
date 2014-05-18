request = require("request")
cheerio = require("cheerio")

module.exports = (app) ->
  app.get "/:username/last", (req, res) ->
    isRetweeted = false
    url = "https://twitter.com/" + req.params.username
    request url, (err, rrr, body) ->
      $ = cheerio.load(body)
      $last = $('.js-tweet').first()
      data = $last.data()
      tweet = $last.find('.js-tweet-text').html().trim()
      fullName = data.name
      userName = data.screenName
      timeStamp = $last.find('.js-short-timestamp').html().trim()
      avatarURL = $last.find('.js-action-profile-avatar').attr('src')
      isRetweeted = data.retweeter ? $last.find('.js-retweet-text').text().trim()
      if tweet is null
        tweet = "This user's tweets are protected."
        avatarURL = "/images/protected.png"
      if fullName is null
        tweet = "This user does not exist."
        avatarURL = "/images/not_exist.png"
      res.render "tweet",
        fullName: fullName
        userName: userName
        timeStamp: timeStamp
        tweet: tweet
        isRetweeted: isRetweeted
        avatarURL: avatarURL
