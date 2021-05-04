import React from 'react'
import PropTypes from 'prop-types'
import { useLiveQuery } from 'dexie-react-hooks'
import { useIndexedDb } from '../../hooks'
import {
  HotCandidateCompaniesContainer,
  HotCandidateCompany,
} from "./styledComponents"

const HotCandidateCompanies = ({ candidateId }) => {
  const db = useIndexedDb()
  const user = useLiveQuery(() => db.users.get(candidateId))
  const companies = user?.identifiedCompanies
  return (
    <HotCandidateCompaniesContainer>
      {companies?.map((single) => <HotCandidateCompany key={single}>{single}</HotCandidateCompany>)}
    </HotCandidateCompaniesContainer>
  )
}

HotCandidateCompanies.propTypes = {
  candidateId: PropTypes.number
}

export default HotCandidateCompanies
