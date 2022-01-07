import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { useIdentifiedCompanies } from "../../hooks"
import transformToArrayIfNecessary from "../../utils/transformToArrayIfNecessary"
import { HotCandidateCompaniesContainer, HotCandidateCompany } from "./styledComponents"

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

const HotCandidateCompaniesIdentified = ({ identified = [] }) => {
  const identifiedCompanies = useIdentifiedCompanies(identified)

  if (!identifiedCompanies.isSuccess) {
    return null
  }

  const identifiedCompaniesData = transformToArrayIfNecessary(identifiedCompanies?.data?.data)

  const handleDeleteCompany = async (companyId) => {
    // const updatedCompanies = companies.filter((company) => company !== companyName)
    // await db.users.update(candidateId, { identifiedCompanies: updatedCompanies })
  }

  return (
    <HotCandidateCompaniesContainer>
      {identifiedCompaniesData?.map((identifiedCompany) => (
        <HotCandidateCompany key={identifiedCompany.id}>
          {identifiedCompany.name}
          <DeleteCompanyButton
            title={`Delete identified company ${identifiedCompany.name}`}
            onClick={() => handleDeleteCompany(identifiedCompany.id)}
          />
        </HotCandidateCompany>
      ))}
    </HotCandidateCompaniesContainer>
  )
}

HotCandidateCompaniesIdentified.propTypes = {
  identified: PropTypes.arrayOf(PropTypes.string),
}

export default HotCandidateCompaniesIdentified
