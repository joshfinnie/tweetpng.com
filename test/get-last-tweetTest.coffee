chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /joshfinnie/last', ->
    it 'returns get-last-tweet page', (done) ->
        request(app)
            .get('/joshfinnie/last')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done
        return
    return
