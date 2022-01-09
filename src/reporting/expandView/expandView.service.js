import { pathOr } from 'ramda'

import { get } from '../../utils/api'

export const getCompanyNameByClientContactId = (id) =>
  get('query/ClientContact', {
    fields: 'clientCorporation',
    where: `id=${id}`,
  }).then((response) => pathOr('', ['data', 0, 'clientCorporation', 'name'], response))
