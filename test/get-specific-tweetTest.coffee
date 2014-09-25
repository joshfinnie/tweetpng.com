chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /joshfinnie/status/354761173800976384', ->
    it 'returns get-last-tweet page', (done) ->
        request(app)
            .get('/joshfinnie/status/354761173800976384')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done
