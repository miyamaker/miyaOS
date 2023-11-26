type WithTimestamp<T extends { timestamp: number }> = T

export function findLastObject<T extends { timestamp: number }>(
  record: Record<string, WithTimestamp<T>>
): WithTimestamp<T> | undefined {
  const lastEntry = Object.entries(record).reduce<[string, WithTimestamp<T>] | undefined>((latest, [key, obj]) => {
    if (!latest || obj.timestamp > latest[1].timestamp) {
      return [key, obj]
    }

    return latest
  }, undefined as [string, WithTimestamp<T>] | undefined)

  return lastEntry ? lastEntry[1] : undefined
}
