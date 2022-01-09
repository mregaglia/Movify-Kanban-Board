import { useMutation, useQueryClient } from 'react-query'

import { post } from '../utils/api'

const useUpdateJobSubmission = () => {
  const queryClient = useQueryClient()
  return useMutation(({ jobSubmissionId, status }) => post(`entity/JobSubmission/${jobSubmissionId}`, { status }), {
    onSettled: () => {
      queryClient.invalidateQueries('find-candidate-job-submissions')
    },
  })
}

export default useUpdateJobSubmission
