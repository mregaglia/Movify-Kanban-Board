import { useQueries } from "react-query"
import { get } from "../utils/api"

const useFindCandidates = (candidatesIdb = []) =>
  useQueries(
    candidatesIdb?.map((candidate) => ({
      queryKey: ["find-candidate", candidate?.id],
      queryFn: () =>
        get(`entity/Candidate/${candidate?.id}`, {
          fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
        }),
    }))
  )

export default useFindCandidates
