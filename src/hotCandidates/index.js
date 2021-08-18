import React, { useMemo, useState } from "react"
import { isPast, isToday, isWithinInterval, addWeeks, addDays, addMonths, intlFormat, formatDistanceToNow } from "date-fns"
import styled from "styled-components"
import PropTypes from "prop-types"
import {
  useJobSubmissions,
  useJobOrders,
  useFindCandidates,
} from "../hooks"
import theme from "../style/theme"
import { useIndexedDb } from "../hooks"
import Bm from "../kanban/BmHotCandidates"
import { STATUS_IDENTIFIED, STATUS_INTAKE, STATUS_TO_SEND, STATUS_WF_FEEDBACK_2, STATUS_WF_RESPONSE } from "../utils/kanban"
import AddCandidateModal from "./AddCandidateModal"
import DeleteCandidateModal from "./DeleteCandidateModal"
import AddCompanyModal from "./AddCompanyModal"
import { ADD, ADD_COMPANY } from "./utils"
import { useLiveQuery } from "dexie-react-hooks"
import getMapValue from "../utils/getMapValue"

const Main = styled.main`
  display: grid;
  gap: 2rem;
`

export const hotCandidatesStatusKeys = new Map([
  [STATUS_TO_SEND, "toSend"],
  [STATUS_WF_RESPONSE, "wfResponse"],
  [STATUS_INTAKE, "intake"],
  [STATUS_WF_FEEDBACK_2, "wfFeedback"],
  [STATUS_IDENTIFIED, "identified"],
])

const BENCH = 'Bench'
const PROJECT_ROTATIONS = 'Project Rotations'
const WFP = 'WFP++'

const initialModalState = {
  delete: {
    isOpen: false,
    title: BENCH,
    candidateId: null,
  },
  add: {
    isOpen: false,
    title: BENCH,
  },
  addCompany: {
    isOpen: false,
    title: BENCH,
    candidateId: null,
  }
}

const formatDate = (dateAvailable) => {
  const relativeDate = formatDistanceToNow(dateAvailable)
  const exactDate = intlFormat(dateAvailable, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }, {
    locale: 'nl-BE'
  })

  return { exactDate, relativeDate }
}

// If only one result is return from the API, respone.data will not be an array but a single object
const transformToArrayIfNecessary = (data) => {
  if (Array.isArray(data)) {
    return data
  }
  return [data]
}

const mapCandidate = ({ candidate, candidatesIdb = [], jobSubmissions = [], jobOrders = [], bench, projectRotations, wfp, updatedJobSubmission }) => {
  let statusObject = {
    toSend: [],
    wfResponse: [],
    intake: [],
    wfFeedback: [],
    identified: [],
  }

  const type = candidatesIdb?.find((hotCandidate) => hotCandidate?.id === candidate?.id)?.type

  for (const jobSubmission of jobSubmissions) {
    const jobSubmissionFromCurrentCandidate = jobSubmission.candidate.id === candidate.id
    if (jobSubmissionFromCurrentCandidate) {
      let currentStatusKey = getMapValue(hotCandidatesStatusKeys, jobSubmission.status)

      const jobOrderId = jobSubmission?.jobOrder?.id ? String(jobSubmission.jobOrder.id) : ""
      const jobTitle = jobSubmission?.jobOrder?.title ?? ''
      const jobOrder = jobOrders?.find((single) => single?.id === jobSubmission?.jobOrder?.id)
      const company = jobOrder?.clientCorporation?.name ?? ''
      const owner = jobOrder?.owner

      if (updatedJobSubmission && String(jobSubmission.id) === updatedJobSubmission?.jobSubmissionId) {
        currentStatusKey = getMapValue(hotCandidatesStatusKeys, updatedJobSubmission.status)
      }

      statusObject = {
        ...statusObject,
        [currentStatusKey]: [
          ...statusObject[currentStatusKey],
          {
            jobTitle,
            company,
            jobOrderId,
            jobSubmissionId: String(jobSubmission.id),
            owner,
          }
        ]
      }
    }
  }

  let dateAvailable = candidate?.dateAvailable
  let dateColorCode = theme.dateAvailableStatusColors.noData

  if (dateAvailable) {
    const now = new Date()
    const tomorrow = addDays(now, 1)
    const inTwoWeeks = addWeeks(now, 2)
    const inOneMonth = addMonths(now, 1)
    const inTwoMonths = addMonths(now, 2)

    // Available now
    if (isToday(dateAvailable) || isPast(dateAvailable)) {
      dateAvailable = formatDate(dateAvailable)
      dateAvailable = { ...dateAvailable, relativeDate: "now" }
      dateColorCode = theme.dateAvailableStatusColors.now

      // Between tomorrow and 2 weeks
    } else if (isWithinInterval(dateAvailable, { start: tomorrow, end: inTwoWeeks })) {
      dateAvailable = formatDate(dateAvailable)
      dateColorCode = theme.dateAvailableStatusColors.betweenTomorrorowAndTwoWeeks

      // Between 2 weeks and 1 month
    } else if (isWithinInterval(dateAvailable, { start: inTwoWeeks, end: inOneMonth })) {
      dateAvailable = formatDate(dateAvailable)
      dateColorCode = theme.dateAvailableStatusColors.betweenTwoWeeksAndOneMonth

      // Between 1 and 2 months
    } else if (isWithinInterval(dateAvailable, { start: inOneMonth, end: inTwoMonths })) {
      dateAvailable = formatDate(dateAvailable)
      dateColorCode = theme.dateAvailableStatusColors.betweenOneAndTwoMonths

      // Should always be longer than 2 months
    } else {
      dateAvailable = formatDate(dateAvailable)
      dateColorCode = theme.dateAvailableStatusColors.twoMonthsOrLonger
    }
  } else {
    dateAvailable = {
      relativeDate: "unknown",
      exactDate: "unknown",
    }
  }

  const mappedCandidate = {
    name:
      candidate?.firstName && candidate?.lastName
        ? `${candidate?.firstName} ${candidate?.lastName}`
        : "/",
    firstName: candidate?.firstName,
    lastName: candidate?.lastName,
    dateAvailable,
    dateColorCode,
    role: candidate?.occupation ?? "/",
    identified: [],
    type,
    id: candidate?.id,
    ...statusObject,
  }

  if (type === BENCH) {
    bench.push(mappedCandidate)
  } else if (type === PROJECT_ROTATIONS) {
    projectRotations.push(mappedCandidate)
  } else if (type === WFP) {
    wfp.push(mappedCandidate)
  }
}

const HotCandidatesPage = ({ updatedJobSubmission }) => {
  const [modalState, setModalState] = useState(initialModalState)
  const db = useIndexedDb()
  const candidatesIdb = useLiveQuery(() => db.users.toArray())

  let candidates = useFindCandidates(candidatesIdb)
  candidates = candidates?.map((candidate) => candidate?.data?.data)

  const maxNumberOfPossibleJobSubmissions = candidates?.reduce((accumulator, current) => accumulator + current?.submissions?.total, 0)
  const candidateIds = [...new Set(candidates?.map((candidate) => candidate?.id))]

  let { data: jobSubmissions } = useJobSubmissions(
    candidateIds ?? [],
    maxNumberOfPossibleJobSubmissions,
  )

  jobSubmissions = jobSubmissions?.data ?? []
  jobSubmissions = transformToArrayIfNecessary(jobSubmissions)

  const jobOrderIds = [...new Set(jobSubmissions?.map((jobSubmission) => jobSubmission.jobOrder.id))] ?? []
  const maxNumberOfPossibleJobOrders = jobOrderIds?.length

  let { data: jobOrders } = useJobOrders(
    jobOrderIds,
    maxNumberOfPossibleJobOrders,
  )

  jobOrders = jobOrders?.data ?? []
  jobOrders = transformToArrayIfNecessary(jobOrders)

  const data = useMemo(() => {
    const wfp = []
    const bench = []
    const projectRotations = []

    for (const candidate of candidates) {
      mapCandidate({ candidate, candidatesIdb, jobSubmissions, jobOrders, bench, projectRotations, wfp, updatedJobSubmission })
    }

    return {
      bench,
      projectRotations,
      wfp,
    }
  }, [candidates, jobSubmissions, jobOrders, candidatesIdb, updatedJobSubmission])

  const handleCloseModal = () => {
    setModalState(initialModalState)
  }

  const handleOpenModal = (title, modalType, candidateId = null) => {
    let newModalState = {}
    if (modalType === ADD_COMPANY) {
      newModalState = {
        ...initialModalState,
        addCompany: {
          isOpen: true,
          title,
          candidateId,
        }
      }
    } else if (modalType === ADD) {
      newModalState = {
        ...initialModalState,
        add: {
          isOpen: true,
          title,
        }
      }
    } else {
      newModalState = {
        ...initialModalState,
        delete: {
          isOpen: true,
          title,
          candidateId,
        }
      }
    }

    setModalState(newModalState)
  }

  return (
    <>
      <Main>
        <Bm color={theme.hotCandidateStatusColors.green} kanbanType="HOT_CANDIDATES" data={data.bench} title={BENCH} onOpenModal={handleOpenModal} />
        <Bm color={theme.hotCandidateStatusColors.blue} kanbanType="HOT_CANDIDATES" data={data.projectRotations} title={PROJECT_ROTATIONS} onOpenModal={handleOpenModal} />
        <Bm color={theme.hotCandidateStatusColors.grey} kanbanType="HOT_CANDIDATES" data={data.wfp} title={WFP} onOpenModal={handleOpenModal} />
      </Main>
      <AddCandidateModal isOpen={modalState.add.isOpen} title={modalState.add.title} onClose={handleCloseModal} />
      <DeleteCandidateModal isOpen={modalState.delete.isOpen} title={modalState.delete.title} candidateId={modalState.delete.candidateId} onClose={handleCloseModal} />
      <AddCompanyModal isOpen={modalState.addCompany.isOpen} title={modalState.addCompany.title} candidateId={modalState.addCompany.candidateId} onClose={handleCloseModal} />
    </>
  )
}

HotCandidatesPage.propTypes = {
  updatedJobSubmission: PropTypes.shape({
    jobSubmissionId: PropTypes.string,
    status: PropTypes.string,
  })
}


export default HotCandidatesPage
