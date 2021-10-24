export default new (class Stack {
  private value: string[] = []

  push(id: string) {
    this.value.push(id)
  }

  pop() {
    this.value.pop()
  }

  get last() {
    return this.value[this.value.length - 1]
  }
})()
