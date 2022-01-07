import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobSubmissions = (candidateIds) => {
  return useQuery(
    ["find-job-submissions-candidates", candidateIds.join()],
    () =>
      get(`query/JobSubmission`, {
        // Might not need everything here
        fields:
          "id, jobOrder(id, clientCorporation, owner), status, candidate(id, firstName, lastName, name, dateAvailable, occupation, owner)",
        where: `candidate.id IN (${candidateIds?.join()}) AND status IN ('WF Response', 'To Send', 'Intake', 'WF Feedback')`,
        count: 50,
      }),
    {
      enabled: !!candidateIds?.length,
      refetchOnWindowFocus: false,
    }
  )
}

export default useJobSubmissions
