import vm from 'vm'
import fs from 'fs'
import path from 'path'

import demand from 'must'
import describe from './features/describe'
import it from './features/it'

import { bulletGroup } from './utils/group'
import EventEmitter from 'events'
import uuid from './utils/uuid'

export default { inject, exec }

let isConfigurable = true

const baseContextConfig = { process, console, describe, it, demand }
let contextConf: vm.Context
function inject(injectConf: vm.Context): void {
  if (!isConfigurable)
    throw new Error(
      'The method ${inject} can be invoked only before invoking exec'
    )

  contextConf = Object.assign(baseContextConfig, injectConf)

  bulletGroup(
    'Injecting following dependencies in the to be spawned execution contextes',
    ...Object.keys(injectConf)
  )
}

function exec(suitesPath: string[]): void {
  isConfigurable = false

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

  emitter.on('suite:start', ({ id }) => {
    suites[id] = { id, status: 'start' }
  })

  emitter.on('suite:end', ({ id }) => {
    suites[id] = { id, status: 'end' }
    if (Object.keys(suites).length === suitesAmount) {
      console.log('finished all suites')
    }
  })

  return emitter
}

function createDecoratedVMScript(script: string) {
  const id = uuid()

  const startScript = `emitter.emit('suite:start', { id: '${id}' });\n\n`
  const endScript = `\n\nemitter.emit('suite:end', { id: '${id}' });`

  return new vm.Script(startScript + script + endScript)
}
