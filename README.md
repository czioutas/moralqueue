# Moralqueue

Moralqueue is a Redis based key value, queue system with a Nodejs wrapper.
The main concept is to add a level of sophistication around the simple concept of a queue:
- dynamic access to keys
- replacement of values

## The communication is done on an http level

GET /getByKey returns the value

GET /getQueue returns the whole current queue

GET /first pops the first value

GET /getFirstKey returns the first key

POST / { key : value }


