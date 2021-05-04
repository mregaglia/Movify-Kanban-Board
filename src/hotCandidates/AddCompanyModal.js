import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Select from "react-select"
import { Modal, Title } from '../components/modal'
import { useDebounce, useFind, useIndexedDb } from "../hooks"
import { generateOptions } from "./utils"

const AddCompanyModal = ({ isOpen, onClose, candidateId }) => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const { data: companies } = useFind(debouncedQuery)
  const db = useIndexedDb()

  const handleChange = async (company) => {
    if (company?.label && company?.value) {
      const user = await db.users.get(candidateId)
      if (user) {
        const identifiedCompanies = user?.identifiedCompanies?.length > 0 ? [...user.identifiedCompanies, company.label] : [company.label]
        await db.users.update(candidateId, { identifiedCompanies })
        onClose()
      }
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
}

export default AddCompanyModal
