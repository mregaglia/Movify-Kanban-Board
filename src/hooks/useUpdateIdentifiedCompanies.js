import { useMutation, useQueryClient } from 'react-query'

import { post } from '../utils/api'

import { IDENTIFIED_COMPANIES_FIELD_KEY } from '.'

const useUpdateIdentifiedCompanies = (candidateId) => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ identifiedCompanies }) =>
      post(`entity/Candidate/${candidateId}`, { [IDENTIFIED_COMPANIES_FIELD_KEY]: identifiedCompanies }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('find-job-orders-with-job-submissions')
      },
    }
  )
}

export default useUpdateIdentifiedCompanies
