class SqlParametersManager {
  constructor (obj) {
    this.parameters = Object.keys(obj).filter(key => obj[key] !== undefined)
    this.values = this.parameters.map(parameter => obj[parameter])
  }

  values () {
    return this.values
  }

  params (keys = []) {
    keys = keys.filter(key => this.parameters.includes(key))
    return {
      names: keys.join(),
      numbers: keys.map(key => `$${this.parameters.indexOf(key) + 1}`).join(),
      valid: keys.length > 0,
    }
  }

  number (key) {
    if (!this.parameters.includes(key)) throw new Error('key not found')
    return `$${this.parameters.indexOf(key) + 1}`
  }
}

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
    this.message = message
    this.name = 'HttpError'
  }
}

class MissingFieldsError extends Error {
  constructor (fields) {
    super(`missing fields: ${fields.join()}`)
    this.fields = fields
    this.name = 'MissingFieldsError'
  }
}

export {
  SqlParametersManager,
  HttpError,
  MissingFieldsError,
}
