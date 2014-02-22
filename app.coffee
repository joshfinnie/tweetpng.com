http = require('http')
http.globalAgent.maxSockets = 64
express = require("express")
path = require("path")
app = express()
app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon(path.join(__dirname, 'public/images/favicon.ico'))
  app.use express.logger("dev")
  app.use express.urlencoded()
  app.use express.json()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

app.configure 'development', ->
  app.use express.errorHandler()
  app.locals.pretty = true

require("./routers/home") app
require("./routers/get-last-tweet") app
require("./routers/get-specific-tweet") app
require("./routers/get-tweet-png") app
server = require("http").createServer(app)
port = process.env.PORT or 3000
server.listen port
console.log "Listening port " + port
