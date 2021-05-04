import React from 'react'
import PropTypes from 'prop-types'
import {
  HotCandidateCompaniesContainer,
  HotCandidateCompany,
} from "./styledComponents"

const HotCandidateCompanies = ({ companies }) => {
  return (
    <HotCandidateCompaniesContainer>
      {companies?.map((single) => <HotCandidateCompany key={`${single.jobTitle}-${single.company}`}>{single.company}</HotCandidateCompany>)}
    </HotCandidateCompaniesContainer>
  )
}

HotCandidateCompanies.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  })),
}

export default HotCandidateCompanies
