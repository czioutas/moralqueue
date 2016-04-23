var routes = {}

exports.addRule = function (url, type, callback) {
  if (routes[url] === undefined) {
    var json = { }
    json[type] = callback
    routes[url] = json
  } else {
    routes[url][type] = callback
  }
}

exports.rout = function (req, res) {
  var METHOD = req.method
  var URL = req.url

  if (routes[URL] !== undefined) {
    if (routes[URL][METHOD] !== undefined) {
      res.writeHead(200)
      routes[URL][METHOD](req, res)
    } else {
      res.writeHead(405)
      res.end()
    }
  } else {
    res.writeHead(400)
    res.end('Only / please')
  }
  return
}
