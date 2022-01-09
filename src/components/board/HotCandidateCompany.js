import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'

import { HotCandidateCompany as Container } from './styledComponents'

const HotCandidateCompany = ({ draggableId, company, index, owner, jobTitle }) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        owner={owner}
        title={`${jobTitle} @ ${company} from ${owner?.firstName} ${owner?.lastName}`}
      >
        {company}
      </Container>
    )}
  </Draggable>
)

HotCandidateCompany.propTypes = {
  draggableId: PropTypes.string,
  company: PropTypes.string,
  owner: PropTypes.object,
  jobTitle: PropTypes.string,
  index: PropTypes.number,
}

export default HotCandidateCompany
