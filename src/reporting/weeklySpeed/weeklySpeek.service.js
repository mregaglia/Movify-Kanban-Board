import { get } from "../../utils/api";

export const getCandidateCategory = candidateId =>
  get(`entity/Candidate/${candidateId}`, {
    fields: "categories"
  });