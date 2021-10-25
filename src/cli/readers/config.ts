import path from 'path'
import fse from 'fs-extra'

export interface ConfigFile {
  include: string[]
}

const defaultConfig: ConfigFile = {
  include: ['__test__'],
}

export default function read(config: string) {
  let configFile: ConfigFile = defaultConfig
  if (config) {
    const configFilePath = path.resolve(config)
    if (fse.pathExistsSync(configFilePath)) {
      configFile = fse.readJSONSync(configFilePath)
    } else {
      console.warn(
        `The config file ${config} was not found. Fallback on default config file.`
      )
    }
  }
  return configFile
}
