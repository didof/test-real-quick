import vm from 'vm'
import fs from 'fs'

export default { exec }

function exec(fileAbsolutePath: string) {
  fs.readFile(fileAbsolutePath, 'utf8', (err, data) => {
    vm.runInNewContext(data, { console })
  })
}
