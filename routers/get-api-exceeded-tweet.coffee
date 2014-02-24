request = require("request")

module.exports = (app) ->
  app.get "/:username/api-exceeded", (req, res) ->
    tweet = "This user has exceeded their API count."
    avatarURL = "/images/protected.png"
    res.render "tweet",
      tweet: tweet
      avatarURL: avatarURL
