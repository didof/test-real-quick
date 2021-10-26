it('should pass', () => {
  demand(42).to.equal(42)
})

it('should fail', () => {
  demand('42').to.equal(42)
})
