import { get, post } from "../../utils/api";
import { path } from "ramda"

export const getCandidateCategory = candidateId =>
  get(`entity/Candidate/${candidateId}`, {
    fields: "categories"
  }).then(response => path(["data", "categories", "data"], response))

export const getNoteProspectionLastYear = (idEmployee, dateEnd) =>
  post(
    "search/Note",
    {
      query: `action:"Prospection" AND commentingPerson:${idEmployee} AND dateAdded:[* TO ${dateEnd}] `,
      count: 1000
    },
    {
      fields: "clientContacts, id, dateAdded"
    }
  ).then(response => path(["data"], response))
