type Attribute = {
  trait_type: string
  value: string
}

export function getTokenAttribute(attributes: Attribute[], attribute: string): string {
  return `${attributes.find((item) => item.trait_type === attribute)?.value}`
}
