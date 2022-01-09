import { useQuery } from 'react-query'

import { get } from '../utils/api'

const useIdentifiedCompanies = (companyIds) =>
  useQuery(
    ['find-identified-companies', companyIds?.join()],
    () =>
      get(`entity/ClientCorporation/${companyIds?.join()}`, {
        fields: 'id, name',
      }),
    {
      enabled: !!companyIds?.length,
    }
  )

export default useIdentifiedCompanies
