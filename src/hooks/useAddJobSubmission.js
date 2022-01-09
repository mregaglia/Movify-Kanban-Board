import { useMutation, useQueryClient } from 'react-query'

import { put } from '../utils/api'

const useAddJobSubmission = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ jobOrderId, candidateId }) =>
      put('entity/JobSubmission', {
        candidate: { id: candidateId },
        jobOrder: { id: jobOrderId },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('find-job-orders-with-job-submissions')
      },
    }
  )
}

export default useAddJobSubmission
