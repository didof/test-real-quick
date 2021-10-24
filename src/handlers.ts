'use strict'

type Handler = {
  type: 'suite' | 'test'
  id: string
  title: string
  parentId?: string
  depth: number
}

export type SuiteHandler = Handler & {
  type: 'suite'
  childrenIds: string[]
}

type TestHandler = Handler & {
  type: 'test'
  handler: () => void
}

type Handlers = Map<string, SuiteHandler | TestHandler>

const handlers: Handlers = new Map()

export default handlers

export function debugEmitter() {
  console.dir(handlers)
}
