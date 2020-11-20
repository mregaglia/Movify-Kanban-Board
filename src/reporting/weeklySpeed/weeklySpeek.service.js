import { get } from "../../utils/api";
import { path } from "ramda"

export const getCandidateCategory = candidateId =>
  get(`entity/Candidate/${candidateId}`, {
    fields: "categories"
  }).then(response => path(["data", "categories", "data"],response))