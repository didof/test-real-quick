'use strict'

/**
 * expose features
 */
import describe from './features/describe'
import it from './features/it'
export { describe, it }

import cli from './cli'
import runner from './runner'

// import run from './run'

const { suites } = cli.exec()

runner.exec(suites[0])

// run()
