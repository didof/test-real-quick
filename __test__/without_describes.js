import { demand } from 'must'
import { it } from '../src'

it('should pass', () => {
  demand(42).to.equal(42)
})

it('should fail', () => {
  demand('42').to.equal(42)
})