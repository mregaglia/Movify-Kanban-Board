import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { Modal, Title } from "../components/modal"
import { useDebounce, useFind, useAddJobSubmission } from "../hooks"
import { generateOptions } from "./utils"

const AddCandidateModal = ({ isOpen, onClose, title, jobOrderId }) => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const { data: users } = useFind(debouncedQuery)
  const addJobSubmission = useAddJobSubmission()

  const handleChange = async (user) => {
    if (user?.label && user?.value) {
      addJobSubmission.mutate({ jobOrderId, candidateId: user.value })
      onClose()
    }
  }

  const handleInputChange = (value) => {
    setQuery(value)
  }

  const selectOptions = useMemo(() => {
    let options = []
    if (users?.data?.length > 0) {
      const data = users?.data?.filter((single) => single.entityType === "Candidate") ?? []
      options = generateOptions(data)
    }
    return options
  }, [users])

  const noOptionsMessage = () => "No users found"

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>{`Add a candidate to ${title}`}</Title>
      <Select
        options={selectOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search user"
        isClearable
        noOptionsMessage={noOptionsMessage}
      />
    </Modal>
  )
}

AddCandidateModal.propTypes = {
  isOpen: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  jobOrderId: PropTypes.string,
}

export default AddCandidateModal
