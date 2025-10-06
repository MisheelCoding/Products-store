import { type UiSize, type UiBorderRadius } from '@/types/common/ui'
export function useUi() {
  const getSizeClass = (size: UiSize) => {
    if (size === 'small') return 'ui-size--small'
    else if (size === 'default') return 'ui-size--default'
    else return 'ui-size--large'
  }

  const getBorderRadius = (radius: UiBorderRadius) => {
    switch (radius) {
      case 'small':
        return 'ui-radius--small'
      case 'full':
        return 'ui-radius--full'
      case 'default':
        return 'ui-radius--default'
      default:
        throw new Error(`Нелья radius: ${radius}`)
    }
  }

  return {
    getSizeClass,
    getBorderRadius,
  }
}
