var talk = require('real-talk')

// takes hyperlog `hl`
// and state callback (state) => {} cb
module.exports = (hl, cb) => {

  hl.createReadStream({live:true}).on('data', node => {
    var v = talk.verify(node.value)
    if (v) {
      node.value = v
      cb(node)
    }
  })

  return {

    add: (links, obj, kp, cb) => {
      hl.add(links, talk.signed(obj, kp), cb)
    },
    append: (obj, kp, cb) => {
      hl.append(talk.signed(obj, kp), cb)
    }
  }
}
