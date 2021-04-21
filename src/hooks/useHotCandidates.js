import { useQuery } from "react-query"
import { get } from "../utils/api"

const useHotCandidates = (candidateIds) =>
  useQuery(
    ["find-hot-candidates", candidateIds?.join()],
    () =>
      get(`entity/Candidate/${candidateIds?.join()}`, {
        fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
        count: candidateIds?.length || 0
      }),
    {
      // Enable once we have candidates
      enabled: !!candidateIds?.length,
    }
  )

export default useHotCandidates
