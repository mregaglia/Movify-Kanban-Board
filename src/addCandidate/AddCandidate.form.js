import React from 'react'
import { array, bool, func } from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { Select } from '../components/form'
import { Action, Row } from '../components/modal'
import { statusLabels } from '../utils/statusLabels'
import { isRequired } from '../utils/validate'

import { CandidateInput } from './CandidateInput'

const AddCandidateForm = ({ handleSubmit, onClose, statuses, valid }) => (
  <form onSubmit={handleSubmit}>
    <Field name="candidate" component={CandidateInput} validate={isRequired} />
    <Field
      name="status"
      label="Status"
      component={Select}
      validate={isRequired}
      renderOptions={() =>
        statuses.map((option) => (
          <option key={option} value={option}>
            {statusLabels.get(option)}
          </option>
        ))
      }
    />
    <Row style={{ marginTop: 24 }}>
      <Action type="button" onClick={onClose}>
        Cancel
      </Action>
      <Action type="submit" positive disabled={!valid}>
        Confirm
      </Action>
    </Row>
  </form>
)

AddCandidateForm.propTypes = {
  handleSubmit: func,
  onClose: func,
  statuses: array,
  valid: bool,
}

export default reduxForm({
  form: 'addCandidate',
})(AddCandidateForm)
