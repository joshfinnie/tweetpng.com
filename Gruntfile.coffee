module.exports = (grunt) ->
  grunt.initConfig
    watch:
      home_css:
        files: ['public/css/home.css']
        tasks: ['cssmin:home']
      tweet_css:
        files: ['public/css/tweet.css']
        tasks: ['cssmin:tweet']
      coffeelint:
        files: ['Gruntfile.coffee', 'app.coffee', 'routers/*.coffee']
        tasks: ['coffeelint']
    coffeelint:
      options:
        configFile: 'coffeelint.json'
      files: ['Gruntfile.coffee', 'app.coffee', 'routers/*.coffee']
    cssmin:
      tweet:
        files:
          "public/css/tweet.min.css": ["public/css/tweet.css"]
      home:
        files:
          "public/css/home.min.css": ["public/css/home.css"]

  #load our tasks
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-coffeelint"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["coffee", "jshint", "cssmin"]
