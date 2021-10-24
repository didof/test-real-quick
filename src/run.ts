import {
  createErrorMessage,
  printSummaries,
  reporterDescribe,
  reporterTest,
} from './features/outputWriters'
import handlers, { TestHandler, TestResult } from './handlers'

export interface Summary {
  title: string
  result: TestResult
}

async function recursivelyRunSuites(ids: string[], summaries: Summary[] = []) {
  ids.forEach(id => {
    const handler = handlers.get(id)!

    if (handler.type === 'suite') {
      reporterDescribe(handler)
      recursivelyRunSuites(handler.childrenIds, summaries)
    } else {
      processTest(handler)
    }

    handlers.delete(id)

    if (handlers.size === 0) printSummaries(summaries)
  })

  async function processTest(test: TestHandler) {
    try {
      test.handler()
    } catch (_e: unknown) {
      const err = _e as any

      if (err.name === 'AssertionError') {
        test.result = {
          pass: false,
          message: createErrorMessage(err.expected, err.actual),
        }

        summaries.push({
          title: test.title,
          result: test.result,
        })
      }
    } finally {
      reporterTest(test)
    }
  }
}

export default function run() {
  const rootSuitesIds = collectRootSuitesIds()

  recursivelyRunSuites(rootSuitesIds)
}

function collectRootSuitesIds() {
  return Array.from(handlers).reduce((acc, curr) => {
    return curr[1].parentId === undefined ? [...acc, curr[0]] : acc
  }, [] as string[])
}
