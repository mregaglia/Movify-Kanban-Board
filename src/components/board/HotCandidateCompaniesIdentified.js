import React from 'react'
import PropTypes from 'prop-types'
import { useLiveQuery } from 'dexie-react-hooks'
import { useIndexedDb } from '../../hooks'
import {
  HotCandidateCompaniesContainer,
  HotCandidateCompany,
} from "./styledComponents"

const HotCandidateCompaniesIdentified = ({ candidateId }) => {
  const db = useIndexedDb()
  const user = useLiveQuery(() => db.users.get(candidateId), [candidateId])
  const companies = user?.identifiedCompanies
  return (
    <HotCandidateCompaniesContainer>
      {companies?.length > 0 ? companies?.map((single) => <HotCandidateCompany key={single}>{single}</HotCandidateCompany>) : null}
    </HotCandidateCompaniesContainer>
  )
}

HotCandidateCompaniesIdentified.propTypes = {
  candidateId: PropTypes.number
}

export default HotCandidateCompaniesIdentified
