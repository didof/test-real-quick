import cli from './cli'
import runner from './runner'

import demand from 'must'

const { suites } = cli.exec()

/**
 * Demand is not provided as baseOption [runner.ts] because I want the user to be free to use another similar tool
 */
runner.inject({ demand })

// TODO should run on different suites, not only one
runner.exec(suites)
