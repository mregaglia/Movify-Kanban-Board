import React from "react"
import PropTypes from "prop-types"
import { HotCandidateCompany as Container } from "./styledComponents"
import { Draggable } from "react-beautiful-dnd"

const HotCandidateCompany = ({ draggableId, company, index }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {company}
        </Container>
      )}
    </Draggable>
  )
}

HotCandidateCompany.propTypes = {
  draggableId: PropTypes.string,
  company: PropTypes.string,
  index: PropTypes.number,
}

export default HotCandidateCompany
