var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
    app.get("/:username/last", function(req, res){
        var isRetweeted = false;
        var url = "https://twitter.com/" + req.params.username;
        request(url, function(err, rrr, body){
            $ = cheerio.load(body);
            var tweet = $('.tweet-text').html();
            var fullName = $('.stream-item-header .fullname').html();
            var userName = $('.stream-item-header .username').html();
            var timeStamp = $('.stream-item-header ._timestamp').html();
            var avatarURL = $('.stream-item-header img').attr('src');
            var retweet = $('.js-retweet-text').html();
            if (retweet !== null) {
                isRetweeted = retweet;
            }
            if (tweet === null){
                tweet = "This user's tweets are protected.";
                avatarURL = "/images/protected.png";
            }
            if (fullName === null){
                tweet = "This user does not exist.";
                avatarURL = "/images/not_exist.png";
            }
            res.render("tweet", {fullName:fullName,
                                 userName:userName,
                                 timeStamp:timeStamp,
                                 tweet:tweet,
                                 isRetweeted:isRetweeted,
                                 avatarURL:avatarURL});
        });
    });
};