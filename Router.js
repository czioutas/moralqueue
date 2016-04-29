'use strict'

module.exports = class Router {
  constructor () {
    this.routes = []
  }

  getRoutes () {
    return this.routes
  }

  addRoute (url, type, callback) {
    if (this.routes[url] === undefined) {
      let json = { }
      json[type] = callback
      this.routes[url] = json
    } else {
      this.routes[url][type] = callback
    }
  }

  route (req, res) {
    let METHOD = req.method
    let URL = req.url

    if (this.routes[URL] !== undefined) {
      if (this.routes[URL][METHOD] !== undefined) {
        res.writeHead(200)
        this.routes[URL][METHOD](req, res)
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
}
