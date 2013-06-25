var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
    app.get("/:username/tweet", function(req, res){
        var url = "https://twitter.com/" + req.params.username;
        request(url, function(err, rrr, body){
            $ = cheerio.load(body);
            var tweet = $('.tweet-text').html();
            var avatarURL = $('.content div a img').attr('src');
            res.render("tweet", {tweet:tweet, avatarURL:avatarURL});
        });
    });
};