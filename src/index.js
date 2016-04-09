var halite = require('halite')

function sign (obj, kp) {
  var sk     = halite.sk(kp)
  var str    = JSON.stringify(obj)
  var signed = halite.sign(str, sk)
  return signed
}

function verify (arr, kp) {
  var pk  = halite.pk(kp)
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

// takes hyperlog `hl`
// halite signKeypair `kp`
// and state callback (state) => {} cb
module.exports = (hl, kp, cb) => {
  return {

    _sign: sign,
    _verify: verify,

    left: () => {
      
    },

    right: () => {
      
    },

    up: () => {
      
    },

    down: () => {
      
    },
  }
}
