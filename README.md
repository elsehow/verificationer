# verificationer

## install

    npm install verificationer

## use

```javascript
var Verificationer = requrie('.')
var talk = require('real-talk')
var hyperlog = require('hyperlog')
var memdb = require('memdb')
// make a hyperlog
var log = hyperlog(memdb(), {
    valueEncoding: 'json'
})

// generate a nacl sign keypair with real-talk
var sign_kp = talk.signKeypair()
// here's an object we'll send
var payload = { move: 'left' }

// calls `cb(node)` when a verified item comes through
var veri = Verificationer(log, node => {
  console.log(node.value.body)
})

// add an object payload to the log
veri.add(null, payload, sign_kp, (err, res) => {
  if (err) console.log(err)
})

// > { move: 'left' }
```


## developing

        npm install
        npm run watch

now you can edit `test/index.js` or `src/index.js`

`npm test` will re-run on changes

## license

BSD