var http = require('http')
var route = require('./route')
var main = require('./main')
var PORT = process.env.PORT || 8000

route.addRule('/getByKey', 'GET', function (req, res) {
  var key = Object.keys(req['body'])[0]
  main.getByKey(key, function (value) { res.end(value) })
})

route.addRule('/getQueue', 'GET', function (req, res) {
  main.getQueue(function (value) { res.end(value) })
})

route.addRule('/getQueueSize', 'GET', function (req, res) {
  main.getQueueSize(function (value) { res.end(value) })
})

route.addRule('/first', 'GET', function (req, res) {
  main.getFirstObj(function (value) { res.end(value) })
})

route.addRule('/getFirstKey', 'GET', function (req, res) {
  main.getFirstKey(function (value) { res.end(value) })
})

route.addRule('/', 'POST', function (req, res) {
  var key = Object.keys(req['body'])[0]
  var value = req['body'][key]
  res.write('key: ' + key + ' , ' + 'value: ' + value)
  res.end()
  main.queue(key, value)
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
