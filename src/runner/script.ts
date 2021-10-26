import vm from 'vm'
import uuid from '../utils/uuid'

export default function createDecoratedVMScript(script: string) {
  const id = uuid()

  const startScript = `emitter.emit('suite:start', { id: '${id}' });\n\n`
  const endScript = `\n\nemitter.emit('suite:end', { id: '${id}' });`

  return new vm.Script(startScript + script + endScript)
}
