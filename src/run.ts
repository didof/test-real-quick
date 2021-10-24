import { Handlers } from './handlers'

function collectRootSuitesIds(handlers: Handlers) {
  return Array.from(handlers).reduce((acc, curr) => {
    return curr[1].parentId === undefined ? [...acc, curr[0]] : acc
  }, [] as string[])
}

async function runSuites(handlers: Handlers, ids: string[]) {
  ids.forEach(id => {
    const data = handlers.get(id)!

    switch (data.type) {
      case 'suite':
        runSuites(handlers, data.childrenIds)
        break

      case 'test':
        try {
          data.handler()
        } catch (_e: unknown) {
          const err = _e as any

          if (err.name === 'AssertionError') {
            data.result = {
              pass: false,
              message: createErrorMessage(err.expected, err.actual),
            }
          }
        }
    }
  })
}

function createErrorMessage(expected: any, actual: any) {
  const exp = 'Expected: ' + JSON.stringify(expected)
  const act = 'Actual: ' + JSON.stringify(actual)
  return `\t${exp}.\n\t${act}.`
}

export default function run(handlers: Handlers) {
  const rootSuitesIds = collectRootSuitesIds(handlers)

  runSuites(handlers, rootSuitesIds)
}
