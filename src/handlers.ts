'use strict'

interface Handler {
  type: 'suite' | 'test'
  id: string
  title: string
  parentId?: string
  depth: number
}

export interface SuiteHandler extends Handler {
  type: 'suite'
  childrenIds: string[]
}

export interface TestResult {
  pass: boolean
  message: string
}

export interface TestHandler extends Handler {
  type: 'test'
  handler: () => void
  result: TestResult
}

export type HandlersMap = Map<string, SuiteHandler | TestHandler>

const handlers: HandlersMap = new Map()

export default handlers
