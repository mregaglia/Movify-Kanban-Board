import React, { useMemo, useState } from "react"
import { isPast, isToday, intlFormat } from "date-fns"
import styled from "styled-components"
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
import { ADD } from "./utils"
import { useLiveQuery } from "dexie-react-hooks"

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

export const getMapValue = (map, key) => map.get(key) ?? key

const BENCH = 'Bench'
const PROJECT_ROTATIONS = 'Project Rotations'
const WFP = 'WFP++'

const initialModalState = {
  delete: {
    isOpen: false,
    title: BENCH,
    id: null,
  },
  add: {
    isOpen: false,
    title: BENCH,
  },
}

const mapCandidate = ({ candidate, candidatesIdb = [], jobSubmissions = [], jobOrders = [], bench, projectRotations, wfp }) => {
  let statusObject = {
    toSend: [],
    wfResponse: [],
    intake: [],
    wfFeedback: [],
    identified: [],
  }

  const type = candidatesIdb?.find((hotCandidate) => hotCandidate?.referenceId === candidate?.id)?.type

  for (const jobSubmission of jobSubmissions) {
    const jobSubmissionFromCurrentCandidate = jobSubmission.candidate.id === candidate.id
    if (jobSubmissionFromCurrentCandidate) {
      const currentStatusKey = getMapValue(hotCandidatesStatusKeys, jobSubmission.status)

      const jobTitle = jobSubmission?.jobOrder?.title ?? ''
      const company = jobOrders?.find((jobOrder) => jobOrder?.id === jobSubmission?.jobOrder?.id)?.clientCorporation?.name ?? ''
      statusObject = {
        ...statusObject,
        [currentStatusKey]: [
          ...statusObject[currentStatusKey],
          {
            jobTitle,
            company,
          }
        ]
      }
    }
  }

  const dateAvailable = !candidate?.dateAvailable ? "/" : isPast(candidate.dateAvailable) || isToday(candidate.dateAvailable) ? "NOW" : intlFormat(candidate.dateAvailable, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }, {
    locale: 'nl-BE'
  })

  const mappedCandidate = {
    name:
      candidate?.firstName && candidate?.lastName
        ? `${candidate?.firstName} ${candidate?.lastName}`
        : "/",
    dateAvailable,
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

// Default show date available but allow reordering
const HotCandidatesPage = () => {
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

  const jobOrderIds = [...new Set(jobSubmissions?.map((jobSubmission) => jobSubmission.jobOrder.id))] ?? []
  const maxNumberOfPossibleJobOrders = jobOrderIds?.length

  let { data: jobOrders } = useJobOrders(
    jobOrderIds,
    maxNumberOfPossibleJobOrders,
  )

  jobOrders = jobOrders?.data ?? []

  const data = useMemo(() => {
    const wfp = []
    const bench = []
    const projectRotations = []

    for (const candidate of candidates) {
      mapCandidate({ candidate, candidatesIdb, jobSubmissions, jobOrders, bench, projectRotations, wfp })
    }

    return {
      bench,
      projectRotations,
      wfp,
    }
  }, [candidates, jobSubmissions, jobOrders, candidatesIdb])

  const handleCloseModal = () => {
    setModalState(initialModalState)
  }

  const handleOpenModal = (title, modalType, candidateId = null) => {
    const newModalState = modalType === ADD ? {
      ...initialModalState,
      add: {
        isOpen: true,
        title,
      }
    } : {
      ...initialModalState,
      delete: {
        isOpen: true,
        title,
        candidateId,
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
    </>
  )
}

export default HotCandidatesPage
