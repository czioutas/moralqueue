var http = require('http')
var route = require('./route')
var redis = require("redis")
var PORT = process.env.PORT || 8000

route.addRule('/first', 'GET', function (req, res) {
  res.end()
})

route.addRule('/', 'POST', function (req, res) {
  res.write('hello you')
  res.end('\n')
})

var server = http.createServer(function (req, res) {
  // should move to a middleware js
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
