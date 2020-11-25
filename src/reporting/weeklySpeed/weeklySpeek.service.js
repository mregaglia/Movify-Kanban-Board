import { get, post } from "../../utils/api";
import { path } from "ramda"

export const getCandidateCategory = candidateId =>
  get(`entity/Candidate/${candidateId}`, {
    fields: "categories"
  }).then(response => path(["data", "categories", "data"], response))

export const getNoteProspectionLastYear = (idEmployee, dateStart, dateEnd) =>
  post(
    "search/Note",
    {
      query: `action:\"Prospection\" AND commentingPerson:${idEmployee} AND dateAdded:[${dateStart} TO ${dateEnd}] `,
      count: 400
    },
    {
      fields: "clientContacts"
    }
  ).then(response => path(["data"], response))
