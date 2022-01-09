import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { func, object } from 'prop-types'
import { prop, propOr } from 'ramda'
import { compose } from 'redux'
import styled from 'styled-components'

import Home from './auth/Home'
import Login from './auth/Login'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Kanban from './kanban/Kanban'
import { updateJobSubmission as updateKanbanJobSubmission } from './kanban/kanban.actions'
import Recruitment from './recruitment/Recruitment'
import { updateJobSubmission as updateRecruitmentJobSubmission } from './recruitment/recruitment.actions'
import Reporting from './reporting/components/Reporting'
import { addCandidate, addHotCandidate } from './transition/transition.actions'
import { getColumnData, isFromSameBoard } from './utils/kanban'
import Header from './Header'
import { useUpdateJobSubmission } from './hooks'
import HotCandidates from './hotCandidates'

import 'react-toastify/dist/ReactToastify.css'

const Container = styled.div({
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 25,
  paddingBottom: 25,
})

const Routes = ({
  addCandidate: addCandidateProp,
  addHotCandidate: addHotCandidateProp,
  location,
  updateKanbanJobSubmission: updateKanbanJobSubmissionProp,
  updateRecruitmentJobSubmission: updateRecruitmentJobSubmissionProp,
}) => {
  const [duplicateModalData, setDuplicateModalData] = useState(undefined)
  const [addModalData, setAddModalData] = useState(undefined)
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [updateModalData, setUpdateModalData] = useState(undefined)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updatedJobSubmission, setUpdatedJobSubmission] = useState()
  const updateJobSubmissionMutation = useUpdateJobSubmission()

  const board = propOr(' ', 'pathname', location).substring(1)

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const onDndRecruitment = (
      resultDnd,
      jobSubmissionId,
      src,
      dest,
      srcStatus,
      destStatus,
      jobOrderId,
      destJobOrderId
    ) => {
      if (resultDnd?.source?.droppableId === 'transition') {
        //
      } else if (resultDnd?.destination?.droppableId === 'transition') {
        addCandidateProp('recruitment', jobSubmissionId)
      } else if (isFromSameBoard(src, dest) && src.status !== dest.status) {
        updateRecruitmentJobSubmissionProp(jobOrderId, srcStatus, jobOrderId, jobSubmissionId, destStatus)
      } else if (!isFromSameBoard(src, dest)) {
        setIsUpdateModalOpen(true)
        setUpdateModalData({
          jobOrderId: destJobOrderId,
          jobSubmissionId,
          status: destStatus,
        })
      }
    }

    const onDndKanban = (resultDnd, jobSubmissionId, src, dest, srcStatus, destStatus, jobOrderId, destJobOrderId) => {
      if (resultDnd?.destination?.droppableId === 'transition') {
        //
      } else if (resultDnd?.source?.droppableId === 'transition') {
        setIsAddModalOpen(true)
        setAddModalData({
          jobOrderId: destJobOrderId,
          candidateId: jobSubmissionId,
          status: destStatus,
        })
      } else if (isFromSameBoard(src, dest) && src.status !== dest.status) {
        updateKanbanJobSubmissionProp(jobOrderId, srcStatus, jobSubmissionId, destStatus)
      } else if (!isFromSameBoard(src, dest)) {
        setIsDuplicateModalOpen(true)
        setDuplicateModalData({
          jobOrderId: destJobOrderId,
          jobSubmissionId,
          status: destStatus,
        })
      }
    }

    if (['kanban', 'recruitment'].includes(board)) {
      const jobSubmissionId = draggableId
      const src = getColumnData(result?.source?.droppableId)
      const dest = getColumnData(result?.destination?.droppableId)
      const srcStatus = prop('status', src)
      const destStatus = prop('status', dest)
      const jobOrderId = prop('jobOrderId', src)
      const destJobOrderId = prop('jobOrderId', dest)

      if (board === 'kanban') {
        onDndKanban(result, jobSubmissionId, src, dest, srcStatus, destStatus, jobOrderId, destJobOrderId)
      } else if (board === 'recruitment') {
        onDndRecruitment(result, jobSubmissionId, src, dest, srcStatus, destStatus, jobOrderId, destJobOrderId)
      }
    } else if (board === 'hot-candidates') {
      const destinationDroppableId = destination.droppableId
      const isDestinationTransition = destinationDroppableId === 'transition'

      const { 0: destinationStatus } = destinationDroppableId.split('@')

      const sourceDroppableId = source.droppableId
      const isSourceTransition = sourceDroppableId === 'transition'

      const { 0: oldStatus, 1: candidateId } = sourceDroppableId.split('@')

      if (isSourceTransition) {
        //
      } else if (isDestinationTransition && oldStatus === 'NO_STATUS') {
        addHotCandidateProp('hot-candidates', candidateId)
      } else if (!['NO_STATUS', 'Identified', 'transition'].includes(destinationStatus)) {
        if (oldStatus !== destinationStatus && draggableId) {
          const updatedJobSubmissionData = { jobSubmissionId: draggableId, status: destinationStatus }
          setUpdatedJobSubmission(updatedJobSubmissionData)
          updateJobSubmissionMutation.mutate(updatedJobSubmissionData)
        }
      }
    }
  }

  const onCloseKanbanModals = () => {
    setIsDuplicateModalOpen(false)
    setIsAddModalOpen(false)
  }

  const onCloseRecruitmentModal = () => {
    setIsUpdateModalOpen(false)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Header board={board} />
      <Container>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <AuthenticatedRoute
          exact
          path="/kanban"
          component={Kanban}
          duplicateModalData={duplicateModalData}
          addModalData={addModalData}
          isDuplicateModalOpen={isDuplicateModalOpen}
          isAddModalOpen={isAddModalOpen}
          onCloseModals={onCloseKanbanModals}
        />
        <AuthenticatedRoute
          exact
          path="/recruitment"
          component={Recruitment}
          updateModalData={updateModalData}
          isUpdateModalOpen={isUpdateModalOpen}
          onCloseModal={onCloseRecruitmentModal}
        />

        <AuthenticatedRoute
          exact
          path="/hot-candidates"
          component={HotCandidates}
          updatedJobSubmission={updatedJobSubmission}
        />

        <AuthenticatedRoute exact path="/reporting" component={Reporting} />

        <ToastContainer />
      </Container>
    </DragDropContext>
  )
}

Routes.propTypes = {
  addCandidate: func,
  addHotCandidate: func,
  location: object,
  updateKanbanJobSubmission: func,
  updateRecruitmentJobSubmission: func,
}

export default compose(
  withRouter,
  connect(null, { addCandidate, addHotCandidate, updateKanbanJobSubmission, updateRecruitmentJobSubmission })
)(Routes)
