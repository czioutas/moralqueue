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
  client.hset(queueName, key, value, function (error, result) {
    if (result === 1) {
      if (q[queueName] === undefined) {
        q[queueName] = []
        q[queueName].push(key)
      } else {
        q[queueName].push(key)
      }
    }
  })
}

exports.getFirstObj = function (queueName, callback) {
  process.nextTick(function () {
    dequeue(queueName, callback)
  })
}

function dequeue (queueName, callback) {
    if (q[queueName] === undefined) {
      callback(JSON.stringify({code: 0, msg: 'Queue undefined: ' + queueName}))
      return
    }

    if (q[queueName].length < 1) {
      callback(JSON.stringify({code: 1, msg: 'Empty queue: ' + queueName}))
      return
    }

    var key = q[queueName].shift()

    client.hget(queueName, key, function (err, obj) {
      if (err) {
        callback(JSON.stringify({code: -1, msg: 'An error occured: ' + err}))
      }

      client.hdel(queueName, key)
      callback(JSON.stringify({code: 2, msg: 'success',key: key, value: obj}))
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
