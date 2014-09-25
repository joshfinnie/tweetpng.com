chai = require 'chai'
request = require 'supertest'
chai.expect()

app = require('./../app/server').app

describe 'GET /', ->
    it 'returns home page', (done) ->
        request(app)
            .get('/')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect 200, done
