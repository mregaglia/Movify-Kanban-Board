import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { Modal, Title } from "../components/modal"
import { useDebounce, useFind, useUpdateIdentifiedCompanies, useIdentifiedCompanies } from "../hooks"
import { generateOptions } from "./utils"

const AddCompanyModal = ({ isOpen, onClose, candidateId, identified }) => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const { data: companies } = useFind(debouncedQuery)
  const identifiedCompanies = useIdentifiedCompanies(identified)
  const updateIdentifiedCompanies = useUpdateIdentifiedCompanies(candidateId)

  const handleChange = (company) => {
    if (company?.label && company?.value && identifiedCompanies.isSuccess) {
      const identifiedCompaniesData = identifiedCompanies.data?.data?.map(({ id }) => id)
      const updatedIdentifiedCompanies = [...new Set([...identifiedCompaniesData, company.value])]
      updateIdentifiedCompanies.mutate({ identifiedCompanies: updatedIdentifiedCompanies })
      onClose()
    }
  }

  const handleInputChange = (value) => {
    setQuery(value)
  }

  const selectOptions = useMemo(() => {
    let options = []
    const data = companies?.data?.filter((single) => single.entityType === "ClientCorporation") ?? []
    if (data?.length > 0) {
      options = generateOptions(data)
    }
    return options
  }, [companies])

  const noOptionsMessage = () => "No companies found"

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Add a company</Title>
      <Select
        options={selectOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search company"
        isClearable
        noOptionsMessage={noOptionsMessage}
      />
    </Modal>
  )
}

AddCompanyModal.propTypes = {
  isOpen: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  candidateId: PropTypes.number,
  identified: PropTypes.arrayOf(PropTypes.string),
}

export default AddCompanyModal
