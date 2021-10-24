'use strict'

import { EventEmitter } from 'events'
import handlers, { SuiteHandler } from './handlers'
import stack from './stack'
import uuid from './utils/uuid'

const emitter = new (class MapGeneratorEmitter extends EventEmitter {})()

emitter.on('add:suite', ({ title, handler }) => {
  const id = uuid()

  const parentId = stack.last

  handlers.set(id, {
    type: 'suite',
    id,
    title,
    parentId,
    childrenIds: [],
    depth: stack.length,
  })

  if (parentId && handlers.has(parentId)) {
    const parentHandler = handlers.get(parentId) as SuiteHandler
    parentHandler.childrenIds.push(id)
  }

  stack.push(id)
  handler()
  stack.pop()
})

emitter.on('add:test', ({ title, handler }) => {
  const id = uuid()

  const parentId = stack.last

  if (parentId && handlers.has(parentId)) {
    const parentHandler = handlers.get(parentId) as SuiteHandler
    parentHandler.childrenIds.push(id)
  }

  handlers.set(id, {
    type: 'test',
    id,
    title,
    handler,
    parentId,
    depth: stack.length,
  })
})

export default emitter
