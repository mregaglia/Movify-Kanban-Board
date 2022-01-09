import { useQuery } from 'react-query'

import { get } from '../utils/api'

const useFind = (searchQuery) =>
  useQuery(['find', searchQuery], () => get('find', { query: searchQuery }), {
    // Enable once we have a query
    enabled: !!searchQuery,
  })

export default useFind
