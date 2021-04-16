import React, { useMemo, useState } from "react"
import Dexie from "dexie"
import { isPast, isToday, intlFormat } from "date-fns"
import { useLiveQuery } from "dexie-react-hooks"
import styled from "styled-components"
import { useTable } from "react-table"
import Select from "react-select"
import {
  useFindCandidate,
  useDebounce,
  useHotCandidates,
  useJobSubmissions,
  useJobOrders,
} from "../hooks"
import TableHead from "./TableHead"
import TableBody from "./TableBody"

const db = new Dexie("hot-candidates")

db.version(1).stores({ users: "++id,referenceId,name" })

const Main = styled.main`
  display: grid;
  gap: 2rem;
`

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
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

// #17b978
// #46c3db
// #dee1ec

const HotCandidatesPage = () => {
  const [query, setQuery] = useState("")
  const hotCandidates = useLiveQuery(() => db.users.toArray(), [])

  const debouncedQuery = useDebounce(query, 500)

  const { data: users } = useFindCandidate(debouncedQuery)

  // Should return an array, buggy
  const { data: candidates } = useHotCandidates(
    hotCandidates?.map((candidate) => candidate?.referenceId)
  )

  const { data: jobSubmissions } = useJobSubmissions(
    candidates?.data?.submissions?.data?.map((submission) => submission.id) ??
      []
  )

  const { data: jobOrders } = useJobOrders(
    jobSubmissions?.data?.map((jobSubmission) => jobSubmission.jobOrder.id)
  )

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date Available",
        accessor: "dateAvailable",
      },
      {
        Header: "Function",
        accessor: "function",
      },
      {
        Header: "Identified",
        accessor: "identified",
      },
      {
        Header: "To Send",
        accessor: "toSend",
      },
      {
        Header: "WF Response",
        accessor: "wfResponse",
      },
      {
        Header: "Intake",
        accessor: "intake",
      },
      {
        Header: "WF Feedback",
        accessor: "wfFeedback",
      },
    ],
    []
  )

  const data = useMemo(() => {
    const mappedData = [candidates?.data]?.map((candidate) => {
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
        identified: "",
        ...statusObject,
      }
    })
    return mappedData ?? []
  }, [candidates, jobSubmissions, jobOrders])

  const tableInstance = useTable({ columns, data })

  const handleChange = async (user) => {
    if (user?.label && user?.value) {
      await db.users.add({ name: user.label, referenceId: user.value })
    }
  }

  const handleInputChange = (value) => {
    setQuery(value)
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

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
      <Table {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          rows={rows}
        />
      </Table>
    </Main>
  )
}

export default HotCandidatesPage
