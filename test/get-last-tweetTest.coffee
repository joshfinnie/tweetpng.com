chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /joshfinnie/status/last?withReplies=true', ->
    it 'returns get-last-tweet page', (done) ->
        request(app)
            .get('/joshfinnie/status/last?withReplies=true')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done

describe 'GET /joshfinnie/status/last?withReplies=false', ->
    it 'returns get-last-tweet page', (done) ->
        request(app)
            .get('/joshfinnie/status/last?withReplies=false')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done
