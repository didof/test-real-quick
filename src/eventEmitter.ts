import { EventEmitter } from 'events'
import uuid from './utils/uuid'

const emitter = new EventEmitter()

type SuiteHandler = {
  id: string;
  title: string;
}

type TestHandler = {
  id: string;
  title: string;
  handler: () => void;
}

type Handlers = Map<string, SuiteHandler | TestHandler>

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
    handler
  })
})

export default emitter

export function debugEmitter() {
  console.dir(handlers)
}
