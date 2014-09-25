chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /about', ->
    it 'returns about page', (done) ->
        request(app)
            .get('/about')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done
