import { path, prop } from 'ramda'

import { get } from '../utils/api'

export const getUserId = () => get('/settings/userId').then((response) => prop('userId', response))

export const getUserOccupation = (userId) =>
  get(`/entity/CorporateUser/${userId}`, { fields: 'occupation' }).then((response) =>
    path(['data', 'occupation'], response)
  )
