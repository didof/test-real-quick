import vm from 'vm'
import fs from 'fs'
import path from 'path'

import inject, { contextConf } from './inject'
import { EventEmitter } from 'events'
import createDecoratedVMScript from './script'

export default { inject, exec }

function exec(suitesPath: string[]): void {
  const contextObject = vm.createContext(contextConf)

  contextObject.emitter = createEmitter(suitesPath.length)

  suitesPath.forEach(fileAbsolutePath => {
    fs.readFile(fileAbsolutePath, 'utf8', (err, data) => {
      const script = createDecoratedVMScript(data)
      const filename = path.basename(fileAbsolutePath)

      script.runInNewContext(contextObject, {
        filename,
        breakOnSigint: true,
      })
    })
  })
}

function createEmitter(suitesAmount: number) {
  let suites: Record<string, { id: string; status: 'start' | 'end' }> = {}

  const emitter = new (class SuiteNotificatorEmitter extends EventEmitter {})()

  emitter.on('suite:start', ({ id }: { id: string }) => {
    suites[id] = { id, status: 'start' }
  })

  emitter.on('suite:end', ({ id }: { id: string }) => {
    suites[id] = { id, status: 'end' }
    if (Object.keys(suites).length === suitesAmount) {
      console.log('finished all suites')
    }
  })

  return emitter
}

