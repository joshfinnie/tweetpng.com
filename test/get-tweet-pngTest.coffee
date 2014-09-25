chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /joshfinnie/tweet/last.png', ->
    it 'returns last tweet png', (done) ->
        request(app)
            .get('/joshfinnie/tweet/last.png')
            .expect("Content-Type", "image/png")
            .expect 200, done

describe 'GET /joshfinnie/tweet/354761173800976384.png', ->
    it 'returns a specific tweet png', (done) ->
        request(app)
            .get('/joshfinnie/tweet/354761173800976384.png')
            .expect("Content-Type", "image/png")
            .expect 200, done
