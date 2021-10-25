import symbols from './symbols'

// TODO rewrite with proxy-chainable approach

interface GroupConfig {
  symbol: string
}

export default function group(
  config: GroupConfig,
  label: string,
  ...items: string[]
) {
  console.group(label)
  items.forEach(item =>
    console.info(`${config.symbol ? `${config.symbol} ` : ''}${item}`)
  )
  console.groupEnd()
}

export function bulletGroup(label: string, ...items: string[]) {
  group({ symbol: symbols.bullet }, label, ...items)
}
