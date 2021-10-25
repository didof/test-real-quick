import pkg from '../../package.json'
import { Command, Option } from 'commander'

const options = {
  config: new Option(
    '-c, --config <filename>',
    `For default config see ${pkg.homepage}`
  ),
  files: new Option('-f, --files <filename...>', 'Files to be run.'),
}

export default function useOptions(program: Command) {
  Object.values(options).forEach(option => program.addOption(option))
}
