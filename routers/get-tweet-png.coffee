webshot = require("webshot")
Throttle = require('redis-throttle')
Throttle.configure
  port: 6379
  host: "127.0.0.1"

module.exports = (app) ->
  app.get "/:username/tweet/:tweet.png", (req, res) ->
    if req.params.username.toLowerCase() == 'joshfinnie'
      API_LIMIT = 10000000
    else
      API_LIMIT = 1
    url = ""
    opt =
      screenSize:
        width: 550
        height: 75

      shotSize:
        width: 550
        height: "all"

    ip = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress

    key = ip + ":" + req.params.username.toLowerCase()

    throttle = new Throttle key

    if req.params.tweet is "last"
      throttle.increment 1, (err, count) ->
        throw err if err
        console.log req.params.username + ": " + count
        if count <= API_LIMIT
          url = "http://" + req.headers.host + "/" + req.params.username + "/last"
          webshot url, opt, (err, renderStream) ->
            img = ""
            renderStream.on "data", (data) ->
              img += data.toString("binary")

            renderStream.on "end", ->
              res.setHeader "Content-Type", "image/png"
              res.setHeader "Cache-Control", "public, max-age=300"
              res.setHeader "Expires", new Date(Date.now() + 300000).toUTCString()
              res.writeHead 200
              res.write img, "binary"
              res.end()
        else
          res.sendfile('public/images/api_rate_exceeded.png')
    else
      throttle.increment 1, (err, count) ->
        throw err if err
        if count <= API_LIMIT
          url = "http://" + req.headers.host + "/" + req.params.username + "/status/" + req.params.tweet
          webshot url, opt, (err, renderStream) ->
            img = ""
            renderStream.on "data", (data) ->
              img += data.toString("binary")

            renderStream.on "end", ->
              res.setHeader "Content-Type", "image/png"
              res.setHeader "Cache-Control", "public, max-age=604800"
              res.setHeader "Expires", new Date(Date.now() + 604800000).toUTCString()
              res.writeHead 200
              res.write img, "binary"
              res.end()
        else
          res.sendfile('public/images/api_rate_exceeded.png')
