process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const knex = require('../db/knex');

chai.use(chaiHttp)

describe('Routes', () => {
  it('should return the homepage with text', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.html
      done()
    })
  })

  it('should return a 404 for a non existent route', (done) => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404)
      done()
    })
  })
})

describe('API Routes', () => {

   describe('POST /add', () => {
    it('should add a win', (done) => {
      chai.request(server)
      .post('/add')
      .send({
        token:'q3cp86g0nrZih5bETlYfNrnH',
        team_id:'T5HA0SULE',
        team_domain:'winslow-hq',
        channel_id:'C5FUGQBLH',
        channel_name:'general',
        user_id:'U5GFS4CAE',
        user_name:'keji',
        command:'/add',
        text:'win <@U5GFS4CAE|keji>',
        response_url:'https://hooks.slack.com/commands/T5HA0SULE/188472685904/TIOHVkBRd20wGrazSi81Xhpm'
      })
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
        response.body.should.have.property('response_type')
        response.body.response_type.should.equal('in_channel')
        response.body.should.have.property('text')
        response.body.text.should.equal('*<@U5GFS4CAE|keji> recieved a win*')
        done()
      })
    })

    it('should add a loss', (done) => {
      chai.request(server)
      .post('/add')
      .send({
        token:'q3cp86g0nrZih5bETlYfNrnH',
        team_id:'T5HA0SULE',
        team_domain:'winslow-hq',
        channel_id:'C5FUGQBLH',
        channel_name:'general',
        user_id:'U5GFS4CAE',
        user_name:'keji',
        command:'/add',
        text:'loss <@U5GFS4CAE|keji>',
        response_url:'https://hooks.slack.com/commands/T5HA0SULE/188472685904/TIOHVkBRd20wGrazSi81Xhpm'
      })
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
        response.body.should.have.property('response_type')
        response.body.response_type.should.equal('in_channel')
        response.body.should.have.property('text')
        response.body.text.should.equal('*<@U5GFS4CAE|keji> recieved a loss*')
        done()
      })
    })

    it('should error out when there is no win or loss assigned', (done) => {
      chai.request(server)
      .post('/add')
      .send({
        token:'q3cp86g0nrZih5bETlYfNrnH',
        team_id:'T5HA0SULE',
        team_domain:'winslow-hq',
        channel_id:'C5FUGQBLH',
        channel_name:'general',
        user_id:'U5GFS4CAE',
        user_name:'keji',
        command:'/add',

        text:'<@U5GFS4CAE|keji>',
        response_url:'https://hooks.slack.com/commands/T5HA0SULE/188472685904/TIOHVkBRd20wGrazSi81Xhpm'
      })
      .end((err, response) => {
        response.should.have.status(500)

        done()
      })
    })
  })

  describe('POST /check', () => {
    it('should return number of losses', (done) => {
      chai.request(server)
      .post('/check')
      .send({
        token:'q3cp86g0nrZih5bETlYfNrnH',
        team_id:'T5HA0SULE',
        team_domain:'winslow-hq',
        channel_id:'C5FUGQBLH',
        channel_name:'general',
        user_id:'U5GFS4CAE',
        user_name:'keji',
        command:'/check',
        text:'losses <@U5GFS4CAE|keji>',
        response_url:'https://hooks.slack.com/commands/T5HA0SULE/188472685904/TIOHVkBRd20wGrazSi81Xhpm'
      })
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
        response.body.should.have.property('text')
        response.body.text.should.equal('*<@U5GFS4CAE|keji> has 0 losses*')
        done()
      })
    })

    it('should return number of wins', (done) => {
      chai.request(server)
      .post('/check')
      .send({
        token:'q3cp86g0nrZih5bETlYfNrnH',
        team_id:'T5HA0SULE',
        team_domain:'winslow-hq',
        channel_id:'C5FUGQBLH',
        channel_name:'general',
        user_id:'U5GFS4CAE',
        user_name:'keji',
        command:'/check',
        text:'wins <@U5GFS4CAE|keji>',
        response_url:'https://hooks.slack.com/commands/T5HA0SULE/188472685904/TIOHVkBRd20wGrazSi81Xhpm'
      })
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
        response.body.should.have.property('text')
        response.body.text.should.equal('*<@U5GFS4CAE|keji> has 0 wins*')
        done()
      })
    })
  })
})
