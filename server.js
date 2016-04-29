const http = require('http')
const RouterClass = require('./Router')
const moralQueue = require('./MoralQueue')
const PORT = process.env.PORT || 8000

let myRouter = new RouterClass()
var mQ = new moralQueue()

myRouter.addRoute('/getQueue', 'POST', function (req, res) {
  var queue = req.body.queue
  mQ.getQueue(queue, function (value) { res.end(value) })
})

myRouter.addRoute('/getQueueSize', 'POST', function (req, res) {
  var queue = req.body.queue
  mQ.getQueueSize(queue, function (value) { res.end(value) })
})

myRouter.addRoute('/first', 'POST', function (req, res) {
  var queue = req.body.queue
  mQ.getFirstObj(queue, function (value) { res.end(value) })
})

myRouter.addRoute('/', 'POST', function (req, res) {
  var key = req.body.key
  var value = req.body.value
  var queue = req.body.queue

  res.write('key: ' + key + ' , ' + 'value: ' + value + ' , queue: ' + queue)
  res.end()
  mQ.queue(queue, key, value)
})

const server = http.createServer(function (req, res) {
  let body = []
  req.on('error', function (err) {
    console.error(err)
    res.statusCode = 400
    res.end()
  }).on('data', function (chunk) {
    body.push(chunk)
  }).on('end', function () {
    req['body'] = toJSON(Buffer.concat(body).toString())
    myRouter.route(req, res)
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
