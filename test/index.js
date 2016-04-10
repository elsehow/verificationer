var test = require('tape')
var Verificationer = require('..')

var hyperlog = require('hyperlog')
var talk = require('real-talk')
var memdb = require('memdb')

function makeLog() {
  return hyperlog(memdb(), {
    valueEncoding: 'json'
  })
}
var sign_kp = talk.signKeypair()
var pk = sign_kp.publicKey
var sk = sign_kp.secretKey
var payload = { move: 'left' }

test('we can add / receive some object', t => {
  t.plan(3)
  var veri = Verificationer(makeLog(), node => {
    t.deepEqual(node.value.body, payload)
  })
  veri.add(null, payload, sign_kp, (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})

test('we can append / receive some object', t => {
  t.plan(3)
  var veri = Verificationer(makeLog(), node => {
    t.deepEqual(node.value.body, payload)
  })
  veri.append(payload, sign_kp, (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})
