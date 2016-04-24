var request = require('request')
var randomstring = require('randomstring')
var random = require('random-js')()

var enqueueStartTime, enqueueEndTime, dequeueStartTime, dequeueEndTime

function run (callback) {
  var i = 0
  enqueueStartTime = new Date().getTime()
  do {
    queue()
    i++
  } while (i < 1000)

  dequeueStartTime = new Date().getTime()
  i = 0
  do {
    dequeue()
    i++
  } while (i < 1000)
}

run()

function queue () {
  var key = randomKey(12, 10)
  var value = randomText()

  var json = { }
  json[key] = value

  request.post('http://127.0.0.1:8000/', {
    form: json
  }, function optionalCallback (err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err)
    }
    enqueueEndTime = new Date().getTime()
    console.log('Response: ' + body + ' , dif : ' + Math.abs(enqueueEndTime - enqueueStartTime))
  })
}

function dequeue (callback) {
  request('http://127.0.0.1:8000/first', function (error, response, body) {
    if (error) {
      console.error(error)
    }
    dequeueEndTime = new Date().getTime()
    console.log('Response: ' + body + ' , dif : ' + Math.abs(dequeueEndTime - dequeueStartTime))
  })
}

function randomKey (high, low) {
  return 'SKU' + random.integer(1, 99999)
}

function randomText () {
  return randomstring.generate()
}
