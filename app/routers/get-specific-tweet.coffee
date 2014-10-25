request = require("request")
cheerio = require("cheerio")

module.exports = (app) ->
  app.get "/:username/status/:id", (req, res) ->
    url = "https://twitter.com/" + req.params.username + "/status/" + req.params.id
    request url, (err, rrr, body) ->
      $ = cheerio.load(body)
      tweet = $(".permalink-tweet .tweet-text").html()
      fullName = $(".permalink-header .fullname").html()
      userName = $(".permalink-header .username").html()
      timeStamp = ""
      avatarURL = $(".js-action-profile-avatar").attr("src")
      if fullName is null
        tweet = "This user's tweet is protected or not available."
        avatarURL = "/images/protected.png"
      res.render "tweet",
        fullName: fullName
        userName: userName
        timeStamp: timeStamp
        tweet: tweet
        avatarURL: avatarURL
