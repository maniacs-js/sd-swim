/* eslint no-console:0 */

const assert = require('power-assert')
const pino = require('pino')
const Lab = require('lab')
const lab = exports.lab = Lab.script()

const {describe, it} = lab
const SDSwim = require('../lib/sd-swim')

describe('SD-Swim', () => {

  it('should start a sd-swim node using default port (11000)', done => {
    // start a single node, that should know only his port.
    // Default port:
    const sdswim = new SDSwim({logger: pino()})
    sdswim.on('up', () => {
      const myself = sdswim.whoami()
      assert.strictEqual(myself.host, undefined)
      assert.strictEqual(myself.port, 11000)
      sdswim.stop(done)
    })
    sdswim.start()
  })

  it('should start a sd-swim node passing a port', done => {
    // start a single node, that should know only his port.
    const port = 12345
    const sdswim = new SDSwim({port})
    sdswim.on('up', () => {
      const myself = sdswim.whoami()
      assert.strictEqual(myself.host, undefined)
      assert.strictEqual(myself.port, port)
      sdswim.stop(done)
    })
    sdswim.start()
  })

  it('should start a sd-swim node using a callback', done => {
    const port = 12345
    const sdswim = new SDSwim({port})
    sdswim.start(port => {
      const myself = sdswim.whoami()
      assert.strictEqual(myself.host, undefined)
      assert.strictEqual(myself.port, port)
      sdswim.stop(done)
    })
  })

  it.skip('should failing starting on the same port', done => {
    const port = 12345
    const sdswim = new SDSwim({port})
    sdswim.start((err, port) => {
      assert.strictEqual(err, null)
      const sdswim2 = new SDSwim({port})
      sdswim2.start(err2 => {
        assert.ok(err2)
        sdswim.stop(done)
      })
    })
  })
})