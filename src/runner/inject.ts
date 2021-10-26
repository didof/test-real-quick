import vm from 'vm'

import describe from '../features/describe'
import it from '../features/it'

import { bulletGroup } from '../utils/group'

const baseContextConfig = { process, console, describe, it }

export let contextConf: vm.Context

export default function inject(injectConf: vm.Context): void {
  contextConf = Object.assign(baseContextConfig, injectConf)

  bulletGroup(
    'Injecting following dependencies in the to be spawned execution contextes',
    ...Object.keys(injectConf)
  )
}
