var test = require('tape')
var World = require('..')

var hyperlog = require('hyperlog')
var halite = require('halite')
var memdb = require('memdb')

var log = hyperlog(memdb(), {
  valueEncoding: 'json'
})
var sign_kp = halite.signKeypair()

var player = World(log, sign_kp, state => {
  console.log('world state', state)
})


test('we can sign and verify some object', t => {
  var payload = { move: 'left' }
  var sig = player._sign(payload, sign_kp)
  var ver = player._verify(sig, sign_kp)
  t.deepEqual(ver, payload)
  t.end()
})


player.left()

player.right()

player.up()

player.up()




// need a keypair
