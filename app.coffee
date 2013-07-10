express = require("express")
path = require("path")
app = express()
app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

require("./routers/home") app
require("./routers/get-last-tweet") app
require("./routers/get-specific-tweet") app
require("./routers/get-tweet-png") app
server = require("http").createServer(app)
port = process.env.PORT or 3000
server.listen port
console.log "Listening port " + port