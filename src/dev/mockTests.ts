import describe from '../features/describe'
import it from '../features/it'
import demand from 'must'

describe('macro description alpha', () => {
  describe('sub description A', () => {
    it('test 1A', () => {
      demand('abc').to.equal(123)
    })
  })

  // describe('sub description B', () => {
  //   it('test 1B', () => {})
  // })
})

// describe('macro description beta', () => {
//   describe('sub description beta-2', () => {
//     describe('sub description beta-3', () => {
//       it('test beta', () => {})
//     })
//   })
// })
