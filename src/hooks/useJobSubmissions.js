import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobSubmissions = (candidateIds, maxNumberOfPossibleJobSubmissions) => {
  return useQuery(
    ["find-candidate-job-submissions", candidateIds.join()],
    () =>
      get(`query/JobSubmission`, {
        fields: "id,jobOrder,status,candidate",
        where: `candidate.id IN (${candidateIds?.join()}) AND status IN ('WF Response', 'To Send', 'Intake', 'WF Feedback') AND isDeleted=false`,
        count: maxNumberOfPossibleJobSubmissions
      }),
    {
      enabled: !!(candidateIds?.length && maxNumberOfPossibleJobSubmissions),
      refetchOnWindowFocus: false,
    }
  )
}

export default useJobSubmissions
