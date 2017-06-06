const chai = require('chai')
const should = chai.should()
const userCleaner = require('../helpers/userCleaner')

describe('userCleaner tests', () => {
  it('should be a function', () => {
    userCleaner.should.be.a('function')
    })

  it('should return happy', () => {
    const output = userCleaner('happy');
    output.should.equal('happy');
    })

  it('should return happy', () => {
    const output = userCleaner('<happy>');
    output.should.equal('happy');
    })

  it('should return happy', () => {
    const output = userCleaner("'h',appy");
    output.should.equal('happy');
    })

  it('should return happy!', () => {
    const output = userCleaner("happy!");
    output.should.equal('happy!');
    })
  })
