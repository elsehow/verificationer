var test = require('tape')
var Verificationer = require('..')

var hyperlog = require('hyperlog')
var halite = require('halite')
var memdb = require('memdb')

function makeLog() {
  return hyperlog(memdb(), {
    valueEncoding: 'json'
  })
}
var sign_kp = halite.signKeypair()
var pk = halite.pk(sign_kp)
var sk = halite.sk(sign_kp)
var payload = { move: 'left' }

test('we can sign and verify some object', t => {
  var veri = Verificationer(makeLog(), node => {
    //console.log('verified node!', node)
  })
  var sig = veri._sign(payload, sk)
  var ver = veri._verify(sig, pk)
  t.deepEqual(ver, payload)
  t.end()
})

test('we can add / receive some object', t => {
  t.plan(3)
  var veri = Verificationer(makeLog(), node => {
    t.deepEqual(node.value, payload)
  })
  veri.add(null, payload, sign_kp, (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})

test('we can append / receive some object', t => {
  t.plan(3)
  var veri = Verificationer(makeLog(), node => {
    t.deepEqual(node.value, payload)
  })
  veri.append(payload, sign_kp, (err, res) => {
    t.notOk(err)
    t.ok(res)
  })
})
