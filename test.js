const { describe, it } = require('kocha')
const { parse } = require('./')
const { expect } = require('chai')

describe('matango.parse', () => {
  it('parses simple matango string', () => {
    const result = parse('foo,bar=baz,qux=123')

    expect(result).to.eql([{
      key: 'foo',
      value: null
    }, {
      key: 'bar',
      value: 'baz'
    }, {
      key: 'qux',
      value: '123'
    }])
  })

  it('throws when the given arg is not string', () => {
    expect(() => parse(undefined)).to.throw()
    expect(() => parse({})).to.throw()
    expect(() => parse([])).to.throw()
    expect(() => parse(() => {})).to.throw()
  })

  it('throws when the invalid chars are given', () => {
    expect(() => parse('\n')).to.throw()
    expect(() => parse('\t')).to.throw()
    expect(() => parse('()')).to.throw()
    expect(() => parse('\'')).to.throw()
    expect(() => parse('"')).to.throw()
  })

  it('ignores empty nodes', () => {
    expect(parse('foo,')).to.eql([{ key: 'foo', value: null }])
    expect(parse(',foo')).to.eql([{ key: 'foo', value: null }])
    expect(parse(',foo,')).to.eql([{ key: 'foo', value: null }])
    expect(parse(',,foo,,')).to.eql([{ key: 'foo', value: null }])
  })

  it('throws when a node include more than one = sign', () => {
    expect(() => parse('==')).to.throw()
    expect(() => parse('foo=bar=')).to.throw()
    expect(() => parse(',,foo=bar=')).to.throw()
  })
})
