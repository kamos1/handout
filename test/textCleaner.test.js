const chai = require('chai')
const should = chai.should()
const textCleaner = require('../textCleaner')

describe('textCleaner tests', () => {
  it('should be a function', () => {
    textCleaner.should.be.a('function')
    })

  it('should return happy', () => {
    const output = textCleaner('happy');
    output.should.equal('happy');
    })

  it('should return <happy>', () => {
    const output = textCleaner('<happy>');
    output.should.equal('<happy>');
    })

  it('should return happy', () => {
    const output = textCleaner("'h',appy");
    output.should.equal('happy');
    })

  it('should return happy!', () => {
    const output = textCleaner("happy!");
    output.should.equal('happy!');
    })
  })
