var halite = require('halite')

function sign (obj, sk) {
  var str    = JSON.stringify(obj)
  var signed = halite.sign(str, sk)
  return signed
}

function verify (arr, pk) {
  var ver = halite.verify(arr, pk)
  var obj = null
  try {
    obj = JSON.parse(
      ver.replace(/\\'/g, "'")
    )
  } catch (e) {
    obj = {}
  }
  return obj
}

function serialize (m, kp) {
  var o = {}
  o.sig = halite.serialize(sign(m, halite.sk(kp)))
  o.pk = halite.serialize(halite.pk(kp))
  return o
}

// takes hyperlog `hl`
// halite signKeypair `kp`
// and state callback (state) => {} cb
module.exports = (hl, cb) => {

  hl.createReadStream({live:true}).on('data', node => {
    node.value.sig = halite.deserialize(node.value.sig)
    node.value.pk = halite.deserialize(node.value.pk)
    var v = verify(node.value.sig, node.value.pk)
    if (v) {
      node.value = v
      cb(node)
    }
  })

  return {

    _sign: sign,
    _verify: verify,
    add: (links, obj, kp, cb) => {
      hl.add(links, serialize(obj, kp), cb)
    },
    append: (obj, kp, cb) => {
      hl.append(serialize(obj, kp), cb)
    }
  }
}
