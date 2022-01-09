import React from 'react'
import PropTypes from 'prop-types'

import HotCandidateCompany from './HotCandidateCompany'
import { HotCandidateCompaniesContainer } from './styledComponents'

const HotCandidateCompanies = ({ companies }) => (
  <HotCandidateCompaniesContainer>
    {companies?.map((single, index) => (
      <HotCandidateCompany
        draggableId={single.jobSubmissionId}
        company={single.company}
        owner={single.owner}
        jobTitle={single.jobTitle}
        key={single.jobOrderId}
        index={index}
      />
    ))}
  </HotCandidateCompaniesContainer>
)

HotCandidateCompanies.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      jobOrderId: PropTypes.string.isRequired,
    })
  ),
}

export default HotCandidateCompanies
