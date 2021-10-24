'use strict'

type SuiteHandler = {
  id: string
  title: string
}

type TestHandler = {
  id: string
  title: string
  handler: () => void
}

type Handlers = Map<string, SuiteHandler | TestHandler>

const handlers: Handlers = new Map()

export default handlers

export function debugEmitter() {
  console.dir(handlers)
}
