import { Currency } from '@/types/money.model'

export const getCurrencySign = (currency: Currency) => {
  if (currency === Currency.USD) return '$'
  if (currency === Currency.EUR) return '€'
  if (currency === Currency.PLN) return 'PLN '
  if (currency === Currency.BTC) return 'BTC '
}

export const numberWithSpace = (x?: number) => {
  if (x) {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return parts.join('.')
  }
  return 0
}

export const budgetFormat = (x?: number) => {
  if (x) {
    return new Intl.NumberFormat().format(x)
  }
  return 0
}

export const convertToInternationalCurrencySystem = (value: number) => {
  if (Math.abs(Number(value)) >= 1.0e9) {
    return (Math.abs(Number(value)) / 1.0e9).toFixed(0) + 'B'
  } else {
    if (Math.abs(Number(value)) >= 1.0e6) {
      return (Math.abs(Number(value)) / 1.0e6).toFixed(0) + 'M'
    } else {
      if (Math.abs(Number(value)) >= 1.0e3) {
        return (Math.abs(Number(value)) / 1.0e3).toFixed(0) + 'K'
      } else {
        return Math.abs(Number(value))
      }
    }
  }
}
