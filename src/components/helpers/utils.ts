export const withoutNullishValues = <T extends Record<string, unknown>>(object: T): T => {
  const objectEntries = Object.entries(object)

  const notNullishEntries = objectEntries
    .filter((paramsPair) => paramsPair[1] || paramsPair[1] === 0)
    .filter((paramsPair) => (Array.isArray(paramsPair[1]) ? paramsPair[1].length : true))

  const withoutNullishValues = Object.fromEntries(notNullishEntries)
  return withoutNullishValues as T
}

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
