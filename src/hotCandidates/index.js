import React, { useMemo, useState } from "react"
import { isPast, isToday, intlFormat } from "date-fns"
import { useLiveQuery } from "dexie-react-hooks"
import styled from "styled-components"
import Select from "react-select"
import {
  useFindCandidate,
  useDebounce,
  useHotCandidates,
  useJobSubmissions,
  useJobOrders,
} from "../hooks"
import theme from "../style/theme"
import { useIndexedDb } from "../hooks"

const Main = styled.main`
  display: grid;
  gap: 2rem;
`

const generateOptions = (data = []) =>
  data.map((user) => ({
    label: user.title,
    value: user?.entityId,
  }))

const statusKeys = new Map([
  ["To Send", "toSend"],
  ["WF Response", "wfResponse"],
  ["Intake", "intake"],
  ["WF Feedback", "wfFeedback"],
])

const getMapValue = (map, key) => map.get(key) ?? "other"

// Default show date available but allow reordering
const HotCandidatesPage = () => {
  const [query, setQuery] = useState("")
  const db = useIndexedDb()
  const hotCandidates = useLiveQuery(() => db.users.toArray(), [])

  const debouncedQuery = useDebounce(query, 500)

  const { data: users } = useFindCandidate(debouncedQuery)

  let { data: candidates } = useHotCandidates(
    hotCandidates?.map((candidate) => candidate?.referenceId)
  )

  // Fix for bug API, if only one user was found, it will return an object while it should always return an array
  // If we have no length we wrap the object in an array
  candidates = candidates?.data?.length ? candidates.data : candidates?.data ? [candidates.data] : []

  const jobSubmissionIds = [...new Set(candidates?.map((candidate) => candidate?.submissions?.data?.map((submission) => submission?.id)).flat())]

  const { data: jobSubmissions } = useJobSubmissions(
    // Loop over each candidate
    jobSubmissionIds ?? []
  )

  const { data: jobOrders } = useJobOrders(
    jobSubmissions?.data?.map((jobSubmission) => jobSubmission.jobOrder.id)
  )

  const data = useMemo(() => {
    const mappedData = candidates?.map((candidate) => {
      let statusObject = {
        toSend: [],
        wfResponse: [],
        intake: [],
        wfFeedback: [],
        other: [],
      }

      for (const submission of candidate?.submissions?.data ?? []) {
        const submissionWithDetails = jobSubmissions?.data?.find(
          ({ id }) => id === submission.id
        )
        const jobOrderSubmissionTitle = submissionWithDetails?.jobOrder?.title
        const referencedJobOrderId = submissionWithDetails?.jobOrder?.id

        if (referencedJobOrderId) {
          const currentStatusKey = getMapValue(
            statusKeys,
            submissionWithDetails.status
          )
          const company =
            jobOrders?.data?.find(
              (jobOrder) => jobOrder.id === referencedJobOrderId
            )?.clientCorporation?.name ?? ""

          statusObject = {
            ...statusObject,
            [currentStatusKey]: [
              ...statusObject[currentStatusKey],
              {
                jobTitle: jobOrderSubmissionTitle,
                company,
                title: `${jobOrderSubmissionTitle} @ ${company}`,
              },
            ],
          }
        }
      }

      const dateAvailable = !candidate?.dateAvailable ? "NA" : isPast(candidate.dateAvailable) || isToday(candidate.dateAvailable) ? "NOW" : intlFormat(candidate.dateAvailable, {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }, {
        locale: 'nl-BE'
      })

      return {
        name:
          candidate?.firstName && candidate?.lastName
            ? `${candidate?.firstName} ${candidate?.lastName}`
            : "",
        dateAvailable,
        function: candidate?.occupation || "",
        identified: [],
        ...statusObject,
      }
    })
    const toReturn = mappedData?.length > 0 ? mappedData : []
    return toReturn
  }, [candidates, jobSubmissions, jobOrders])

  const handleChange = async (user) => {
    if (user?.label && user?.value) {
      // We should also check if the user is not already present
      await db.users.add({ name: user.label, referenceId: user.value, color: theme.colors.grey  })
    }
  }

  const handleInputChange = (value) => {
    setQuery(value)
  }

  const selectOptions = useMemo(() => {
    let options = []
    if (users?.data?.length > 0) {
      options = generateOptions(users?.data)
    }
    return options
  }, [users])

  return (
    <Main>
      <Select
        options={selectOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search user"
        isClearable
        noOptionsMessage={() => "No users found"}
      />
    </Main>
  )
}

export default HotCandidatesPage
