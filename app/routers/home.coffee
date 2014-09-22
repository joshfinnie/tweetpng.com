marked = require 'marked'

module.exports = (app) ->
  app.get "/", (req, res) ->
    res.render "home", {marked: marked}
