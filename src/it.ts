'use strict'

import emitter from './eventEmitter'

export default function it(title: string, handler: () => void): void {
  emitter.emit('add:test', { title, handler })
  handler()
}
