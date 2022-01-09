import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ContextMenuTrigger } from 'react-contextmenu'
import { connect } from 'react-redux'
import { func, number, object, oneOfType, string } from 'prop-types'
import { path, pathOr, prop, propOr } from 'ramda'
import styled from 'styled-components'

import { deleteJobSubmission } from '../../kanban/kanban.actions'
import { deleteJobSubmission as deleteRecJobSubmission } from '../../recruitment/recruitment.actions'
import { getCandidateUpdatedComponent, isFreelance } from '../../utils/kanban'
import BullhornBadge from '../BullhornBadge'
import ConfirmationModal from '../ConfirmationModal'
import LinkedinBadge from '../LinkedinBadge'

import CandidateMenu from './CandidateMenu'
import Function from './Function'

const Container = styled.div(({ borderColor, theme }) => ({
  display: 'flex',
  backgroundColor: theme.colors.grey,
  borderRadius: theme.dimensions.borderRadius,
  borderBottomColor: path(['colors', borderColor], theme),
  borderBottomWidth: borderColor ? 4 : 0,
  borderBottomStyle: borderColor ? 'solid' : 'none',
  margin: 5,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  textAlign: 'center',
}))

export const Text = styled.div(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignSelf: 'center',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 4,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const TextColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
})

const CandidateCard = ({
  board,
  deleteJobSubmission: deleteJobSubmissionProp,
  deleteRecJobSubmission: deleteRecJobSubmissionProp,
  index,
  jobSubmissionId,
  jobSubmission,
}) => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false)

  const getDeleteText = () => {
    if (board === 'kanban')
      return `Do you want to delete this candidate for the vacancy ${pathOr('', ['jobOrder', 'title'], jobSubmission)}?`

    if (board === 'recruitment')
      return `Do you want to delete this candidate for the vacancy ${pathOr(
        '',
        ['jobOrder', 'title'],
        jobSubmission
      )}? Beware that it will also delete this candidate in all the other pipelines.`
  }

  const onClose = () => setDisplayDeleteModal(false)

  const onDelete = () => {
    if (board === 'kanban') deleteJobSubmissionProp(jobSubmission)
    if (board === 'recruitment') deleteRecJobSubmissionProp(jobSubmission)
    setDisplayDeleteModal(false)
  }

  return (
    <ContextMenuTrigger id={`${jobSubmissionId}`}>
      <Draggable draggableId={jobSubmissionId} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Container borderColor={isFreelance(propOr({}, 'candidate', jobSubmission)) ? 'darkGrey' : undefined}>
              <Column>
                <BullhornBadge candidate={prop('candidate', jobSubmission)} />
                {getCandidateUpdatedComponent(prop('dateLastModified', jobSubmission))}
              </Column>
              <TextColumn>
                <Text>
                  {pathOr('', ['candidate', 'firstName'], jobSubmission)}{' '}
                  {pathOr('', ['candidate', 'lastName'], jobSubmission)}
                </Text>
                {board === 'recruitment' && (
                  <Function
                    board={board}
                    functionTitle={path(['candidate', 'category', 'name'], jobSubmission)}
                    ccId={prop('clientCorporationId', jobSubmission)}
                  />
                )}
              </TextColumn>
              <Column>
                <LinkedinBadge candidate={prop('candidate', jobSubmission)} />
              </Column>
            </Container>

            <ConfirmationModal
              isOpen={displayDeleteModal}
              onClose={onClose}
              onConfirm={onDelete}
              title={`Candidate ${pathOr('', ['candidate', 'firstName'], jobSubmission)} ${pathOr(
                '',
                ['candidate', 'firstName'],
                jobSubmission
              )}`}
              text={getDeleteText()}
            />
          </div>
        )}
      </Draggable>
      <CandidateMenu id={jobSubmissionId} onDelete={() => setDisplayDeleteModal(true)} />
    </ContextMenuTrigger>
  )
}

CandidateCard.propTypes = {
  board: string,
  candidate: object,
  deleteJobSubmission: func,
  deleteRecJobSubmission: func,
  index: number,
  jobSubmissionId: oneOfType([number, string]),
  jobSubmission: object,
}

export default connect(
  (state, { board, jobSubmissionId }) => ({
    jobSubmission: pathOr({}, [board, 'jobSubmissions', jobSubmissionId], state),
  }),
  { deleteJobSubmission, deleteRecJobSubmission }
)(CandidateCard)
