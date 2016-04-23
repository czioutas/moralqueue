var redis = require('redis')
var client

exports.init = function () {
  initialize()
}

exports.queue = function (key, value) {
  //  SET foo, bar
  //  RPUSH insert_order, foo

  //client.hset(product:SKU1234, value, {ENTER DATA}, redis.print);
  client.hset(key, 'value', value, redis.print)
  client.zadd('testOrderQueue', getTimestamp(), key)
}

exports.getFirst = function () {
  // LRANGE insert_order, 0, 1
}

function initialize () {
  client = redis.createClient()
  client.on('error', function (err) {
    console.log('Error ' + err)
  })
}

function getTimestamp() {
  return unix = Math.round(+new Date())
}

//SET
//HSET product:SKU1234 value {ENTER DATA}
//ZADD order-product timestamp product:SKU1234

//GET FIRST pop
//val = ZRANGE <set> 0 0
//HGET val value

/**
CHEAT SHEET - ORDERD SETS
ZADD <set> <order> <value>
ZRANGE <set> 0 0 get first

**/

/**
CHEAT SHEET - LIST
RPUSH put at the end of list
LPUSH put at the start of list
LRANGE x, y, z retrieves a set S from the list X starting from Y till Z
LLEN gives the length of the list
LPOP grabs the first one from the list ***money sound***
RPOP grabs the last one from the list
 **/
