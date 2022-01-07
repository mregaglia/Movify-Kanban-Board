// If only one result is return from the API, response.data will not be an array but a single object
const transformToArrayIfNecessary = (data) => {
  if (data && Array.isArray(data)) {
    return data
  }
  return [data]
}

export default transformToArrayIfNecessary
