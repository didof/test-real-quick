'use strict'

import emitter from '../eventEmitter'

export default function describe(title: string, handler: () => void): void {
  emitter.emit('add:suite', { title, handler })
}