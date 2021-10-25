import glob from 'glob'
import path from 'path'
import { ConfigFile } from './config'

export default function files(files: string[], configFile: ConfigFile) {
  let suites: string[] = []
  if (!files) {
    configFile.include.forEach(includeDir => {
      glob
        .sync(path.resolve(process.cwd(), includeDir, '**/*.js'))
        .forEach(file => {
          suites.push(file)
        })
    })
  } else {
    files.forEach((filename: string) => {
      let found = false
      for (let includeDir of configFile.include) {
        if (found) break
        glob
          .sync(path.resolve(process.cwd(), includeDir, `**/${filename}`))
          .forEach(file => {
            if (!file) return
            suites.push(file)
            found = true
          })
      }
    })
  }
  return suites
}
