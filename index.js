const INVALID_CHARS = /[\n\t()"']/
const SEP = /\s*,\s*/

/**
 * Parses matango string.
 * @param {string} input The matango string
 * @return {Object[]}
 */
exports.parse = input => {
  const type = typeof input
  if (type !== 'string') {
    throw new Error(`input must be string, ${type} is given`)
  }

  const match = input.match(INVALID_CHARS)

  if (match) {
    throw new Error(`invalid chars are found: ${match[0]}`)
  }

  const result = []

  input.trim().split(SEP).map(kv => {
    if (kv === '') {
      return
    }

    const sepIndex = kv.indexOf('=')

    if (sepIndex === -1) {
      result.push({ key: kv, value: null })
      return
    }

    const key = kv.substr(0, sepIndex).trim()
    const value = kv.substr(sepIndex + 1).trim()

    if (value.indexOf('=') !== -1) {
      throw new Error('More than one "=" found in key-value pair.')
    }

    result.push({ key, value })
  })

  return result
}
