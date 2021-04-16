import { useQuery } from "react-query"
import { get } from "../utils/api"

const useJobOrders = (jobOrders) =>
  useQuery(
    ["find-job-orders", jobOrders?.join()],
    () =>
      get(`entity/JobOrder/${jobOrders?.join()}`, {
        fields: "id,clientCorporation",
      }),
    {
      // Enable once we have jobOrders
      enabled: !!jobOrders?.length,
    }
  )

export default useJobOrders
