import { useQuery } from "react-query"
import { get } from "../utils/api"

// https://rest.bullhornstaffing.com/rest-services/e999/entity/Candidate/123,456?fields=id,firstName,lastName
// https://rest.bullhornstaffing.com/rest-services/e999/entity/Candidate/11997,14101?fields=id,firstName,lastName,dateAvailable,occupation,status
// const useHotCandidates = (candidateIds) =>
//   useQuery(
//     ["find-hot-candidates", candidateIds?.join()],
//     () =>
//       get('query/Candidate', {
//         fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
//         where: `id IN (${candidateIds?.join()})`
//         // query: `id:${candidateIds?.join(" ")}`,
//       }),
//     {
//       // Enable once we have candidates
//       enabled: !!candidateIds?.length,
//     }
//   )
// const useHotCandidates = (candidateIds) =>
//   useQuery(
//     ["find-hot-candidates", candidateIds?.join()],
//     () =>
//       get('search/Candidate', {
//         fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
//         query: `id:${candidateIds?.join(" ")}`,
//       }),
//     {
//       // Enable once we have candidates
//       enabled: !!candidateIds?.length,
//     }
//   )
const useHotCandidates = (candidateIds) =>
  useQuery(
    ["find-hot-candidates", candidateIds?.join()],
    () =>
      get(`entity/Candidate/${candidateIds?.join()}`, {
        fields: "id,firstName,lastName,dateAvailable,occupation,submissions,owner",
      }),
    {
      // Enable once we have candidates
      enabled: !!candidateIds?.length,
    }
  )

export default useHotCandidates
