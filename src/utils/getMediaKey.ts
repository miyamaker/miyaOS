/* eslint-disable no-restricted-syntax */
import { MEDIA_WIDTHS } from '@/theme'

export default function getMediaKey(width: number) {
  for (const key in MEDIA_WIDTHS) {
    if (width <= MEDIA_WIDTHS[key as keyof typeof MEDIA_WIDTHS]) {
      return key
    }
  }

  return 'upToExtraLarge'
}
