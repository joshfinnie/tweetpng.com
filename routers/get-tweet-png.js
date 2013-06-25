var webshot = require("webshot");

module.exports = function(app){
    app.get("/:username/tweet.png", function(req, res){

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
        console.log(req.headers.host);
        var url = "http://" + req.headers.host + "/" + req.params.username + "/tweet";
        console.log(url);
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
    });
}