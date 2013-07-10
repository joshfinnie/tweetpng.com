var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
    app.get("/:username/status/:id", function(req, res){
        var url = "https://twitter.com/" + req.params.username + "/status/" + req.params.id;
        console.log(url);
        request(url, function(err, rrr, body){
            $ = cheerio.load(body);
            var tweet = $('.permalink-tweet .tweet-text').html();
            console.log(tweet);
            var fullName = $('.permalink-header .fullname').html();
            console.log("full name" + fullName);
            var userName = $('.permalink-header .username').html();
            var timeStamp = "";
            var avatarURL = $('.permalink-header a img').attr('src');
            if (fullName === null){
                tweet = "This user's tweet is protected or not available.";
                avatarURL = "/images/protected.png";
            }
            res.render("tweet", {fullName:fullName,
                                 userName:userName,
                                 timeStamp:timeStamp,
                                 tweet:tweet,
                                 avatarURL:avatarURL});
        });
    });
};