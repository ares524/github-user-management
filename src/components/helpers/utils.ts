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

export const CSVToJSON = (csvData) => {
  const data = CSVToArray(csvData)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const objData: any = []
  for (let i = 1; i < data.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objData[i - 1] = {}
    for (let k = 0; k < data[0].length && k < data[i].length; k++) {
      const key = data[0][k]
      objData[i - 1][key] = data[i][k]
    }
  }
  let jsonData = JSON.stringify(objData)
  jsonData = jsonData.replace(/},/g, '},\r\n')
  return jsonData
}

function CSVToArray(csvData, delimiter?) {
  delimiter = delimiter || ','
  const pattern = new RegExp(
    '(\\' + delimiter + '|\\r?\\n|\\r|^)' + '(?:"([^"]*(?:""[^"]*)*)"|' + '([^"\\' + delimiter + '\\r\\n]*))',
    'gi'
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [[]]
  let matches
  while ((matches = pattern.exec(csvData))) {
    let matchedDelimiter = matches[1]
    if (matchedDelimiter.length && matchedDelimiter != delimiter) {
      data.push([])
    }
    if (matches[2]) {
      matchedDelimiter = matches[2].replace(new RegExp('""', 'g'), '"')
    } else {
      matchedDelimiter = matches[3]
    }
    data[data.length - 1].push(matchedDelimiter)
  }
  return data
}
