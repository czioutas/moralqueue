'use strict'

const redis = require('redis')

module.exports = class MoralQueue {
  constructor () {
    this.q = []
    this.client = redis.createClient()
    this.client.on('error', function (err) {
      console.log('Error ' + err)
    })
  }

  getQueueSize (queueName, callback) {
    if (this.q[queueName] !== undefined) {
      callback(this.q[queueName].length + '')
    } else {
      callback(0)
    }
  }

  getQueue (queueName, callback) {
    let self = this
    if (this.q[queueName] !== undefined) {
      callback(self.q[queueName].toString())
    } else {
      callback(0 + '')
    }
  }

  queue (queueName, key, value) {
    let self = this
    this.client.hset(queueName, key, value, function (error, result) {
      if (result === 1) {
        if (self.q[queueName] === undefined) {
          self.q[queueName] = []
          self.q[queueName].push(key)
        } else {
          self.q[queueName].push(key)
        }
      }
    })
  }

  dequeue (queueName, callback) {
    let self = this
    if (this.q[queueName] === undefined) {
      callback(JSON.stringify({code: 0, msg: 'Queue undefined: ' + queueName}))
      return
    }

    if (this.q[queueName].length < 1) {
      callback(JSON.stringify({code: 1, msg: 'Empty queue: ' + queueName}))
      return
    }

    let key = this.q[queueName].shift()
    this.client.hget(queueName, key, function (err, obj) {
      if (err) {
        callback(JSON.stringify({code: -1, msg: 'An error occured: ' + err}))
      }

      self.client.hdel(queueName, key)
      callback(JSON.stringify({code: 2, msg: 'success', key: key, value: obj}))
    })
  }

  getFirstObj (queueName, callback) {
    let self = this
    process.nextTick(function () {
      self.dequeue(queueName, callback)
    })
  }
}
