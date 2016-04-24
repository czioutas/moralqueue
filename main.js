var redis = require('redis')
var client
var q = []

exports.init = function () {
  initialize()
}

exports.getQueueSize = function (queueName, callback) {
  if (q[queueName] !== undefined) {
    callback(q[queueName].length + '')
  } else {
    callback(0)
  }
}

exports.getQueue = function (queueName, callback) {
  if (q[queueName] !== undefined) {
    callback(q[queueName].toString())
  } else {
    callback(0 + '')
  }
}

exports.queue = function (queueName, key, value) {
  client.hset(queueName, key, value)

  if (q[queueName] === undefined) {
    q[queueName] = []
    q[queueName].push(key)
  } else {
    q[queueName].push(key)
  }
}

exports.getFirstObj = function (queueName, callback) {
  process.nextTick(function () {
    dequeue(queueName, callback)
  })
}

function dequeue (queueName, callback) {
  process.nextTick(function () {
    if (q[queueName] === undefined) {
      callback(0)
      return
    }

    if (q[queueName].length < 1) {
      callback(0)
      return
    }

    var key = q[queueName].shift()
    if (key === undefined) {
      callback(0)
      return
    }

    client.hget(queueName, key, function (err, obj) {
      if (err) {
        console.error(err)
        callback(0)
      }

      client.hdel(queueName, key)
      callback(obj)
    })
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
