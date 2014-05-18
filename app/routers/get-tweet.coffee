request = require('request')

module.exports = (app) ->
    app.get "/:username/statuses/:id", (req, res) ->
        url = "https://api.twitter.com/1/statuses/oembed.json?id=" + req.params.id
        request url, (err, rrr, body) ->
            json = JSON.parse(body)
            res.render 'status', html: json.html
