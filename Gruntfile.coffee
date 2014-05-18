module.exports = (grunt) ->
  grunt.initConfig
    watch:
      home_css:
        files: ['app/public/css/home.css']
        tasks: ['cssmin:home']
      tweet_css:
        files: ['app/public/css/tweet.css']
        tasks: ['cssmin:tweet']
      coffeelint:
        files: ['Gruntfile.coffee', 'app/server.coffee', 'app/routers/*.coffee']
        tasks: ['coffeelint']
    coffeelint:
      options:
        configFile: 'coffeelint.json'
      files: ['Gruntfile.coffee', 'app/server.coffee', 'app/routers/*.coffee']
    cssmin:
      tweet:
        files:
          "app/public/css/tweet.min.css": ["app/public/css/tweet.css"]
      home:
        files:
          "app/public/css/home.min.css": ["app/public/css/home.css"]

  #load our tasks
  grunt.loadNpmTasks "grunt-coffeelint"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["coffeelint", "cssmin"]
