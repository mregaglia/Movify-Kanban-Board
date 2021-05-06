import { useMutation, useQueryClient } from "react-query"
import { post } from "../utils/api"

const useUpdateJobSubmission = () => {
  const queryClient = useQueryClient()
  return useMutation(({ jobSubmissionId, status }) => post(`entity/JobSubmission/${jobSubmissionId}`, { status }), {
    onMutate: async (updatedJobSubmissionData) => {
      await queryClient.cancelQueries("find-candidate-job-submissions")

      const previousJobSubmissions = queryClient.getQueryData("find-candidate-job-submissions")

      if (previousJobSubmissions) {
        const updatedEntry = previousJobSubmissions?.data?.find(({ id }) => Number(updatedJobSubmissionData.jobSubmissionId) === Number(id))

        if (updatedEntry) {
          updatedEntry.status = updatedJobSubmissionData.status
          queryClient.setQueryData("find-candidate-job-submissions", (old) => {
            return old.data.map((single) => {
              if (single.id === updatedEntry.id) {
                return updatedEntry
              }
              return single
            })
          })
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("find-candidate-job-submissions")
    },
  })
}

export default useUpdateJobSubmission
