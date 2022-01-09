import { path } from 'ramda'

import { get, post } from '../../utils/api'

export const getCandidateCategory = (candidateId) =>
  get(`entity/Candidate/${candidateId}`, {
    fields: 'categories',
  }).then((response) => path(['data', 'categories', 'data'], response))

export const getNoteProspectionLastYear = (idEmployee, dateEnd) =>
  post(
    'search/Note',
    {
      // Note that Notes with action type "Prospection scheduled" are also included
      query: `action:"Prospection" AND commentingPerson:${idEmployee} AND dateAdded:[* TO ${dateEnd}] `,
      count: 1000,
    },
    {
      fields: 'clientContacts, id, dateAdded, action',
    }
  ).then((response) => path(['data'], response))
