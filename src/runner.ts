import vm from 'vm'
import fs from 'fs'

import demand from 'must'
import describe from './features/describe'
import it from './features/it'

import { bulletGroup } from './utils/group'

export default { inject, exec }

const baseOptions = { console, describe, it, demand }
let options: Record<string, any>
function inject(injectObject: Record<string, any>) {
  bulletGroup(
    'Injecting following dependencies in the to be spawned execution contextes',
    ...Object.keys(injectObject)
  )

  options = Object.assign(baseOptions, injectObject)
}

function exec(fileAbsolutePath: string) {
  fs.readFile(fileAbsolutePath, 'utf8', (err, data) => {
    vm.runInNewContext(data, options)
  })
}
