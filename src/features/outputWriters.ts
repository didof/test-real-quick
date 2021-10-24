import chalk from 'chalk'
import { SuiteHandler, TestHandler } from '../handlers'
import { Summary } from '../run'
import symbols from '../utils/symbols'

export function reporterDescribe(suite: SuiteHandler) {
  const depth = '  '.repeat(suite.depth)

  console.log(`${depth}${symbols.bullet} ${suite.title}`)
}

export function reporterTest(test: TestHandler) {
  const depth = '  '.repeat(test.depth)
  const symbol = test.result.pass ? symbols.success : symbols.failure

  console.log(`${depth}${symbol} ${test.title}`)
}

export function createErrorMessage(expected: any, actual: any) {
  const exp = chalk.yellow('Expected: ' + JSON.stringify(expected))
  const act = chalk.red('Actual: ' + JSON.stringify(actual))
  return `\t${exp}\n\t${act}`
}

export function printSummaries(summaries: Summary[]) {
  console.info('\n\n' + chalk.underline.bgRed.yellowBright('Summary'))
  summaries.forEach(summary => {
    const title = chalk.underline(summary.title)
    const fail = chalk.red('FAIL')
    console.info(
      `\n   ${symbols.failure} ${fail} ${title}\n${summary.result.message}`
    )
  })
}
