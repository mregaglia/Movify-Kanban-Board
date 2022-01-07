import React, { useState } from "react"
import PropTypes from "prop-types"
import { getTime, parseISO } from "date-fns"
import styled, { css } from "styled-components"
import { Draggable } from "react-beautiful-dnd"
import Board from "./board/Board"
import { HOT_CANDIDATE_STATUSES } from "../utils/kanban"
import { Trash } from "./svgs"
import enforceHighContrast from "../utils/enforceHighContrast"
import useUpdateDateAvailableCandidate from "../hooks/useUpdateDateAvailableCandidate"
import BullhornLink from "../reporting/components/BullhornLink"
import LinkedinLink from "../reporting/components/LinkedinLink"

const Container = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 6fr;
`

const Name = styled.p`
  font-weight: 600;
  margin: 0;
`

const StyledBoard = styled(Board)`
  grid-row: 1;
  grid-column: 2;
`

const Text = styled.div`
  display: grid;
  gap: 0.5rem;
  align-self: start;
  padding-top: 1rem;
  grid-column: 1;
  grid-row: 1;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 2rem;
  height: 2rem;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  font-size: 0;
  margin-top: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`

const Role = styled.p`
  margin: 0;
`

const DateAvailable = styled.button`
  ${({ colorCode }) => css`
    background-color: ${colorCode};
    width: max-content;
    padding: 0.5rem;
    border-radius: 6px;
    color: ${enforceHighContrast(colorCode)};
    margin: 0;
    border: none;
    display: block;
    &:hover {
      cursor: pointer;
    }
  `}
`

const DateAvailableWrapper = styled.div`
  position: relative;
`

const DateAvailableInput = styled.input`
  ${({ theme: { colors, fonts } }) => css`
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid ${colors.mediumGrey};
    font-family: ${fonts.fontFamily};
    font-size: 0.8rem;
    grid-column: span 2;
    &:hover {
      cursor: pointer;
    }
  `}
`

const DateAvailableLabel = styled.label`
  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.fontFamily};
    font-size: 0.8rem;
    padding-bottom: 0.5rem;
    display: block;
    grid-row: 1;
  `}
`

const DateAvailableInputWrapper = styled.form`
  ${({ theme: { colors } }) => css`
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid ${colors.mediumGrey};
    margin-top: 0.5rem;
    cursor: default;
    display: grid;
    grid-template-columns: 1fr auto;
  `}
`

const ConfirmDateAvailableButton = styled.button`
  ${({ theme: { colors } }) => css`
    padding: 0.5rem;
    border-radius: 6px;
    border: none;
    background-color: ${colors.green};
    margin-top: 0.5rem;
    color: white;
    grid-column: span 2;
    &:hover {
      cursor: pointer;
    }
  `}
`

const CloseDateAvailableInputButton = styled.button`
  ${({ theme: { colors } }) => css`
    width: 10px;
    height: 10px;
    position: relative;
    padding: 0;
    background: none;
    border: none;
    grid-row: 1;
    &:hover {
      cursor: pointer;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 10px;
      width: 2px;
      background-color: ${colors.darkGrey};
      top: 0;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  `}
`
const StyledLinkedinLink = styled(LinkedinLink)`
  text-align: center;
`

const Links = styled.div`
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
`

const HotCandidate = ({
  hotCandidate: {
    name,
    role,
    jobSubmissionId,
    dateAvailable: initialDateAvailable,
    id,
    dateColorCode,
    firstName,
    lastName,
    ...statusesData
  },
  onOpenDeleteModal,
  onOpenAddCompanyModal,
  index,
}) => {
  const [isDateAvailableInputOpen, setIsDateAvailableInputOpen] = useState(false)
  const [dateAvailable, setDateAvailable] = useState()
  const updateDateAvailableCandidate = useUpdateDateAvailableCandidate(id)

  const handleClickOpenDeleteModal = () => {
    onOpenDeleteModal(jobSubmissionId)
  }
  const handleClickOpenAddCompanyModal = () => {
    onOpenAddCompanyModal(id)
  }

  const handleToggleDateAvailableInput = () => {
    setIsDateAvailableInputOpen(!isDateAvailableInputOpen)
  }

  const handleChangeDateAvailable = (e) => {
    if (e?.target?.value) {
      setDateAvailable(e.target.value)
    }
  }

  const handleSubmitDateAvailable = (e) => {
    e.preventDefault()
    if (dateAvailable) {
      const timestamp = getTime(parseISO(dateAvailable))
      updateDateAvailableCandidate.mutate({ dateAvailable: timestamp })
      setIsDateAvailableInputOpen(false)
    }
  }

  const draggableId = `NO_STATUS@${id}`

  return (
    <Container>
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <Text
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Name>{name}</Name>
            <Role>{role}</Role>
            <DateAvailableWrapper>
              <DateAvailable
                title={initialDateAvailable?.exactDate}
                colorCode={dateColorCode}
                onClick={handleToggleDateAvailableInput}
              >
                {initialDateAvailable?.relativeDate}
              </DateAvailable>
              {isDateAvailableInputOpen ? (
                <DateAvailableInputWrapper onSubmit={handleSubmitDateAvailable}>
                  <DateAvailableLabel htmlFor="dateAvailable">Change date of availability</DateAvailableLabel>
                  <CloseDateAvailableInputButton onClick={handleToggleDateAvailableInput} />
                  <DateAvailableInput
                    type="date"
                    id="dateAvailable"
                    name="dateAvailable"
                    onChange={handleChangeDateAvailable}
                  />
                  <ConfirmDateAvailableButton type="submit" title="Update availability date">
                    Confirm
                  </ConfirmDateAvailableButton>
                </DateAvailableInputWrapper>
              ) : null}
            </DateAvailableWrapper>
            <Links>
              <BullhornLink candidateId={id} isClient={false} />
              <StyledLinkedinLink firstName={firstName} lastName={lastName} />
            </Links>
          </Text>
        )}
      </Draggable>
      <StyledBoard
        board="hot-candidates"
        statuses={HOT_CANDIDATE_STATUSES}
        statusesData={statusesData}
        onOpenAddCompanyModal={handleClickOpenAddCompanyModal}
        candidateId={id}
      />
      <DeleteButton onClick={handleClickOpenDeleteModal}>
        <Trash size={16} />
      </DeleteButton>
    </Container>
  )
}

HotCandidate.propTypes = {
  hotCandidate: PropTypes.object,
  onOpenDeleteModal: PropTypes.func,
  onOpenAddCompanyModal: PropTypes.func,
  index: PropTypes.number,
}

export default HotCandidate
