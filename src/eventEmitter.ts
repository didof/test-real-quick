'use strict'

import { EventEmitter } from 'events'
import handlers from './handlers'
import uuid from './utils/uuid'

const emitter = new (class MapGeneratorEmitter extends EventEmitter {})()

emitter.on('add:suite', ({ title, handler }) => {
  const id = uuid()
  handlers.set(id, {
    id,
    title,
  })

  handler()
})

emitter.on('add:test', ({ title, handler }) => {
  const id = uuid()
  handlers.set(id, {
    id,
    title,
    handler,
  })
})

export default emitter
