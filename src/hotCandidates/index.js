import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { useTable } from "react-table"
import Select from "react-select"
import useFindCandidate from "../hooks/useFindCandidate"
import useDebounce from "../hooks/useDebounce"

const Main = styled.main`
  display: grid;
  gap: 2rem;
`

const generateOptions = (data) =>
  data.map((user) => ({
    label: `${user?.title} - ${user.byLine}`,
    value: user?.entityId,
  }))

const HotCandidatesPage = () => {
  const [query, setQuery] = useState("")

  const debouncedQuery = useDebounce(query, 500)

  const { data: users } = useFindCandidate(debouncedQuery)

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date Available",
        accessor: "date-available",
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
        accessor: "to-send",
      },
      {
        Header: "WF Response",
        accessor: "wf-response",
      },
      {
        Header: "Intake",
        accessor: "intake",
      },
      {
        Header: "WF Feedback",
        accessor: "wf-feedback",
      },
    ],
    []
  )

  const data = useMemo(() => {
    return []
  }, [])

  const tableInstance = useTable({ columns, data })

  const handleChange = () => {

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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const {
              key: headerGroupKey,
              ...headerGroupProps
            } = headerGroup.getHeaderGroupProps()
            return (
              <tr key={headerGroupKey} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...headerProps } = column.getHeaderProps()
                  return (
                    <th key={key} {...headerProps}>
                      {column.render("Header")}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const { key: rowKey, ...rowProps } = row.getRowProps()
            return (
              <tr key={rowKey} {...rowProps}>
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps()
                  return (
                    <td key={key} {...cellProps}>
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Main>
  )
}

export default HotCandidatesPage
