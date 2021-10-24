import { EventEmitter } from 'events'
import Handlers from './types/Handlers'
import uuid from './utils/uuid'

const emitter = new (class MapGeneratorEmitter extends EventEmitter {})()

const handlers: Handlers = new Map()

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

export function debugEmitter() {
  console.dir(handlers)
}
