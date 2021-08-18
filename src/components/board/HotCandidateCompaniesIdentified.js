import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from "styled-components"
import { useLiveQuery } from 'dexie-react-hooks'
import { useIndexedDb } from '../../hooks'
import {
  HotCandidateCompaniesContainer,
  HotCandidateCompany,
} from "./styledComponents"

const DeleteCompanyButton = styled.button`
  ${({ theme: { colors } }) => css`
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    display: grid;
    background-color: ${colors.mediumGrey};
    border: none;
    cursor: pointer;
    &::before {
      content: "x";
      color: ${colors.white};
    }
  `}
`

const HotCandidateCompaniesIdentified = ({ candidateId }) => {
  const db = useIndexedDb()
  const user = useLiveQuery(() => db.users.get(candidateId), [candidateId])
  const companies = user?.identifiedCompanies ?? []

  const handleDeleteCompany = async (companyName) => {
    const updatedCompanies = companies.filter((company) => company !== companyName)
    await db.users.update(candidateId, { identifiedCompanies: updatedCompanies })
  }

  return (
    <HotCandidateCompaniesContainer>
      {companies?.length > 0 ? companies?.map((single) => (
        <HotCandidateCompany key={single}>
          {single}
          <DeleteCompanyButton title={`Delete identified company ${single}`} onClick={() => handleDeleteCompany(single)} />
        </HotCandidateCompany>
      )) : null}
    </HotCandidateCompaniesContainer>
  )
}

HotCandidateCompaniesIdentified.propTypes = {
  candidateId: PropTypes.number
}

export default HotCandidateCompaniesIdentified
