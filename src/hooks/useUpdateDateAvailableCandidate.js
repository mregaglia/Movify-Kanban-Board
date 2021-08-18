import { useMutation, useQueryClient } from "react-query"
import { post } from "../utils/api"

const useUpdateDateAvailableCandidate = (candidateId) => {
  const queryClient = useQueryClient()
  return useMutation(({ dateAvailable }) => post(`entity/Candidate/${candidateId}`, { dateAvailable }), {
    onSettled: (data) => {
      queryClient.invalidateQueries(["find-candidate", data?.changedEntityId])
    },
  })
}

export default useUpdateDateAvailableCandidate
