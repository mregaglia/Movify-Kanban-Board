import { useMutation, useQueryClient } from 'react-query'

import { del } from '../utils/api'

const useDeleteJobSubmission = (jobSubmissionId) => {
  const queryClient = useQueryClient()
  return useMutation(() => del(`entity/JobSubmission/${jobSubmissionId}`), {
    onSettled: () => {
      queryClient.invalidateQueries('find-job-orders-with-job-submissions')
    },
  })
}

export default useDeleteJobSubmission
