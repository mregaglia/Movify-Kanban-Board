import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobSubmissions = (jobSubmissions) =>
  useQuery(
    ["find-candidate-job-submissions", jobSubmissions?.join()],
    () =>
      get(`entity/JobSubmission/${jobSubmissions?.join()}`, {
        fields: "id,jobOrder,status",
      }),
    {
      // Enable once we have jobSubmissions
      enabled: !!jobSubmissions?.length,
    }
  )

export default useJobSubmissions
