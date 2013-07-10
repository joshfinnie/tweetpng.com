request = require("request")
cheerio = require("cheerio")
module.exports = (app) ->
  app.get "/:username/last", (req, res) ->
    isRetweeted = false
    url = "https://twitter.com/" + req.params.username
    request url, (err, rrr, body) ->
      $ = cheerio.load(body)
      tweet = $(".tweet-text").html()
      fullName = $(".stream-item-header .fullname").html()
      userName = $(".stream-item-header .username").html()
      timeStamp = $(".stream-item-header ._timestamp").html()
      avatarURL = $(".stream-item-header img").attr("src")
      isRetweeted = $(".js-retweet-text").html()  if $(".js-retweet-text a").attr("href").toLowerCase().substr(1) isnt $(".stream-item-header .username b").html().toLowerCase()
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