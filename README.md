# verificationer

## install

    npm install verificationer

## use

```javascript
var hyperlog = require('hyperlog')
var halite = require('halite')
var memdb = require('memdb')
// make a hyperlog
var log = hyperlog(memdb(), {
    valueEncoding: 'json'
})

// generate a nacl sign keypair with halite
var sign_kp = halite.signKeypair()
var pk = halite.pk(sign_kp)
var sk = halite.sk(sign_kp)
// here's an object we'll send
var payload = { move: 'left' }

// calls `cb(node)` when a verified item comes through
var veri = Verificationer(log, node => {
  t.deepEqual(node.value, payload)
})

// add an object payload to the log
veri.add(null, payload, sign_kp, (err, res) => {
  t.notOk(err)
  t.ok(res)
})
```


## developing

        npm install
        npm run watch

now you can edit `test/index.js` or `src/index.js`

`npm test` will re-run on changes

## license

BSD