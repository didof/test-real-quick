type SuiteHandler = {
  id: string
  title: string
}

type TestHandler = {
  id: string
  title: string
  handler: () => void
}

type Handlers = Map<string, SuiteHandler | TestHandler>

export default Handlers
