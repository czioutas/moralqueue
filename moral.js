var http = require('http')
var route = require('./route')
var main = require('./main')
var PORT = process.env.PORT || 8000

route.addRule('/getQueue', 'POST', function (req, res) {
  var queue = req.body.queue
  main.getQueue(queue, function (value) { res.end(value) })
})

route.addRule('/getQueueSize', 'POST', function (req, res) {
  var queue = req.body.queue
  main.getQueueSize(queue, function (value) { res.end(value) })
})

route.addRule('/first', 'POST', function (req, res) {
  var queue = req.body.queue
  main.getFirstObj(queue, function (value) { res.end(value) })
})

route.addRule('/', 'POST', function (req, res) {
  var key = req.body.key
  var value = req.body.value
  var queue = req.body.queue

  res.write('key: ' + key + ' , ' + 'value: ' + value + ' , queue: ' + queue)
  res.end()
  main.queue(queue, key, value)
})

var server = http.createServer(function (req, res) {
  var body = []
  req.on('error', function (err) {
    console.error(err)
    res.statusCode = 400
    res.end()
  }).on('data', function (chunk) {
    body.push(chunk)
  }).on('end', function () {
    req['body'] = toJSON(Buffer.concat(body).toString())
    route.rout(req, res)
  })
})

server.listen(PORT)
main.init()
console.log('Server is running under port ' + PORT)

function toJSON (body) {
  var newJSON = {}
  var arrayBody = body.split('&')
  arrayBody.forEach(function (item, index) {
    var tempSplit = item.split('=')
    newJSON[decodeURIComponent(tempSplit[0])] = decodeURIComponent(tempSplit[1])
  })
  return newJSON
}
