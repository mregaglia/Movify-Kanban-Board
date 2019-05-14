import React from "react";
import { Field, reduxForm } from "redux-form";
import { prop } from "ramda";
import { bool, func } from "prop-types";
import { AVAILABLE_STATUSES } from "../../utils/kanban";
import { isRequired } from "../../utils/validate";
import { Action, Row } from "../../components/modal";
import { Select } from "../../components/form";
import CandidateInput from "./CandidateInput";

const AddCandidateForm = ({ handleSubmit, onClose, valid }) => (
  <form onSubmit={handleSubmit}>
    <Field name="candidate" component={CandidateInput} validate={isRequired} />
    <Field
      name="status"
      label="Status"
      component={Select}
      validate={isRequired}
      renderOptions={() =>
        AVAILABLE_STATUSES.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      }
    />
    <Row>
      <Action type="button" onClick={onClose}>
        Cancel
      </Action>
      <Action type="submit" positive disabled={!valid}>
        Confirm
      </Action>
    </Row>
  </form>
);

AddCandidateForm.propTypes = {
  handleSubmit: func,
  onClose: func,
  valid: bool
};

export default reduxForm({
  form: "addCandidate",
  initialValues: {
    candidate: { firstName: "elisa", lastName: "elloo" },
    status: prop(0, AVAILABLE_STATUSES)
  }
})(AddCandidateForm);
