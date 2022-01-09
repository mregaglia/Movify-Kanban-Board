import { isEmpty, isNil } from 'ramda'

export const isRequired = (value) => {
  if (isEmpty(value) || isNil(value)) return 'Required'
}
