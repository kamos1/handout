const chai = require('chai')
const should = chai.should()
const typeCheck = require('../typeCheck')

describe('isWin tests', () => {
  it('should be a function', () => {
    typeCheck.should.be.a('function')
    })

  it('should return 1', () => {
    const output = typeCheck('win');
    output.should.equal(1);
    })

  it('should return 2', () => {
    const output = typeCheck('loss');
    output.should.equal(2);
    })

  it('should return error message', () => {
    const output = typeCheck('');
    output.should.equal('not a type');
    })
  })
