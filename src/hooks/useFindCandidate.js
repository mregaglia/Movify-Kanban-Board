import { useQuery } from "react-query"
import { get } from "../utils/api"

const useFindCandidate = (searchQuery) =>
  useQuery(["find-candidate", searchQuery], () =>
    get('find', { query: searchQuery }),
    {
      // Enable once we have a query
      enabled: !!searchQuery,
    }
  )

export default useFindCandidate
