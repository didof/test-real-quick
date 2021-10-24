'use strict'

import describe from './describe'
import it from './it'
import { debugEmitter } from './eventEmitter'

describe('macro description', () => {
  describe('sub description A', () => {
    it('test 1A', () => {})
    it('test 2A', () => {})
    it('test 3A', () => {})
  })

  describe('sub description B', () => {
    it('test 1B', () => {})
  })
})

debugEmitter()

export { describe, it }