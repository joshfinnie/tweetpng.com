http = require('http')
http.globalAgent.maxSockets = 64
express = require("express")
favicon = require('serve-favicon')
morgan = require('morgan')
bodyParser = require('body-parser')
methodOverride = require('method-override')
path = require("path")

app = exports.app = express()

app.set "port", process.env.PORT or 3000
app.set "views", __dirname + "/views"
app.set "view engine", "jade"
app.use express.static(__dirname + "/public")
app.use favicon(__dirname + '/public/images/favicon.ico')
app.use morgan('dev')
app.use bodyParser.urlencoded({ extended: false })
app.use bodyParser.json()
app.use methodOverride()

require("./routers/home") app
require("./routers/about") app
require("./routers/get-last-tweet") app
require("./routers/get-specific-tweet") app
require("./routers/get-tweet-png") app

server = require("http").createServer(app)
port = process.env.PORT or 3000
server.listen port

console.log "Listening port " + port
