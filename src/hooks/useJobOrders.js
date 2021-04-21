import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobOrders = (jobOrders, maxNumberOfPossibleJobOrders) => {
  return useQuery(
    ["find-job-orders", jobOrders?.join()],
    () =>
      get(`entity/JobOrder/${jobOrders?.join()}`, {
        fields: "id,clientCorporation",
        count: maxNumberOfPossibleJobOrders
      }),
    {
      // Enable once we have jobOrders
      enabled: !!(jobOrders?.length && maxNumberOfPossibleJobOrders),
    }
  )
}

export default useJobOrders
