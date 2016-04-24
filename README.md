# Moralqueue

> A moral (from Latin morālis) is a message conveyed or a lesson to be learned from a story or event. The moral may be left to the hearer, reader or viewer to determine for themselves, or may be explicitly encapsulated in a maxim.

Moralqueue is a Redis based key value, queue system with a Nodejs wrapper.
The main concept is to add a level of sophistication around the simple concept of a queue:
- dynamic access to keys
- replacement of values
- multiple queues

## The communication is done on an http level


POST /getQueue [param: queue name as 'queue'] returns the whole queue

POST /getQueueSize [param: queue name as 'queue'] returns the queue size

POST /first [param: queue name as 'queue'] pops the first value of the queue

POST / { key : value }
