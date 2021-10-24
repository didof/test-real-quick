'use strict'

import describe from './describe'
import handlers, { debugEmitter } from './handlers'
import it from './it'
import run from './run'

import './mockTests'

run(handlers)

debugEmitter()

export { describe, it }
