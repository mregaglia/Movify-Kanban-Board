import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobOrdersWithJobSubmissions = () => {
  return useQuery(
    ["find-job-orders-with-job-submissions"],
    () =>
      get("query/JobOrder", {
        fields:
          "id, title, submissions(id, candidate(id, firstName, lastName, name, dateAvailable, occupation, owner))",
        where: "id IN (380, 1180, 1181)",
      }),
    {
      refetchOnWindowFocus: false,
    }
  )
}

export default useJobOrdersWithJobSubmissions
