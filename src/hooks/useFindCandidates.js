import { useQueries } from "react-query"
import { get } from "../utils/api"

const useFindCandidates = (candidatesIdb = []) =>
  useQueries(
    candidatesIdb?.map((candidate) => ({
      queryKey: ["find-candidate", candidate?.referenceId],
      queryFn: () =>
        get(`entity/Candidate/${candidate?.referenceId}`, {
          fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
        }),
    }))
  )

export default useFindCandidates
