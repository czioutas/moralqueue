var redis = require('redis')
var client
var queue = []

exports.init = function () {
  initialize()
}

exports.getQueue = function (callback) {
  callback(queue.toString())
}

exports.queue = function (key, value) {
  client.hset(key, 'value', value)
  queue.push(key)
}

exports.getByKey = function (key, callback) {
  client.hget(key, 'value', function (err, obj) {
    callback(obj)
  })
}

exports.getFirstObj = function (callback) {
  process.nextTick(function () {
    dequeue(callback)
  })
}

function dequeue (callback) {
  process.nextTick(function () {
    if (queue.length < 1) {
      callback(0)
    } else {
      key = queue.shift()
      client.hget(key, 'value', function (err, obj) {
        client.hdel(key, 'value')
        callback(obj)
      })
    }
  })
}

function initialize () {
  client = redis.createClient()
  client.on('error', function (err) {
    console.log('Error ' + err)
  })
}

function getTimestamp () {
  return unix = Math.round(+new Date())
}
