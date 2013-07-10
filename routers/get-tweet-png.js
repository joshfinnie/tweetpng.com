var webshot = require("webshot");

module.exports = function(app){
    app.get("/:username/tweet/:tweet.png", function(req, res){
        var url = "";
        var opt = {
            screenSize: {
                width: 550,
                height: 75
            },
            shotSize: {
                width: 550,
                height: 'all'
            }
        };

        if (req.params.tweet === 'last') {
            url = "http://" + req.headers.host + "/" + req.params.username + "/last";
            webshot(url, opt, function(err, renderStream) {
                var img = "";

                renderStream.on("data", function(data){
                    img+=data.toString('binary');
                });

                renderStream.on("end", function(){
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                });

            });
        } else {
            url = "http://" + req.headers.host + "/" + req.params.username + "/status/" + req.params.tweet;
            webshot(url, opt, function(err, renderStream) {
                var img = "";

                renderStream.on("data", function(data){
                    img+=data.toString('binary');
                });

                renderStream.on("end", function(){
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                });

            });
        }
    });
};