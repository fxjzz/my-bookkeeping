interface FData {
  [k: string]: JSONValue
}
type Rule<T> = {
  key: keyof T
  message: string
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp } | { type: 'notEqual'; value: JSONValue })
export type Rules<T> = Rule<T>[]

export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.forEach((rule) => {
    const { key, type, message } = rule //{key:'name',type:'required',message:'必填'},
    const value = formData[key]
    if (key === 'tag_ids' && value.length === 0) {
      errors[key] = errors[key] ?? []
      errors[key]?.push(message)
    }
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'pattern':
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'notEqual':
        if (!isEmpty(value) && value === rule.value) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      default:
        return
    }
  })

  return errors
}
function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === ''
}

export function hasError(errors: Record<string, string[]>) {
  let result = false
  for (let key in errors) {
    if (errors[key]?.length > 0) {
      result = true
      break
    }
  }
  return result
}
