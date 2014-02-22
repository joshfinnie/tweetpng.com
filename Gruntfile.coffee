module.exports = (grunt) ->
  grunt.initConfig
    watch:
      home_css:
        files: ['public/css/home.css']
        tasks: ['cssmin:home']
      tweet_css:
        files: ['public/css/tweet.css']
        tasks: ['cssmin:tweet']
      jshint:
        files: ['routers/*.js', 'app.js'],
        tasks: ['jshint']
      coffeelint:
        files: ['Gruntfile.coffee']
        tasks: ['coffeelint']
      coffee_routers:
        files: ['routers/cs/*.coffee']
        tasks: ['coffee:routers']
      coffee_app:
        files: ['app.coffee']
        tasks: ['coffee:app']
    coffee:
      routers:
        expand: true,
        flatten: true,
        cwd: 'routers/cs',
        src: ['*.coffee'],
        dest: 'routers/',
        ext: '.js'
      app:
        files:
          'app.js': 'app.coffee'
    jshint:
      files: ['routers/*.js', 'app.js'],
    coffeelint:
      files: ['Gruntfile.coffee']
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
