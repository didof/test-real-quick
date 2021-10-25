import pkg from '../../package.json'
import { Command } from 'commander'

import registerOptions from './options'
import { readConfig, readFiles } from './readers'

export default { exec }

function exec() {
  const program = new Command()
  program.version(pkg.version, '-v, --vers', 'output the current version')
  program.showSuggestionAfterError()
  program.showHelpAfterError('(add --help for additional information)')

  registerOptions(program)

  program.parse(process.argv)
  const opts = program.opts()

  const configFile = readConfig(opts.config)

  const suites = readFiles(opts.files, configFile)

  return {
    config: configFile,
    suites,
  }
}
