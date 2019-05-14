import React, { useRef, useState } from "react";
import { prop } from "ramda";
import { object, string } from "prop-types";
import { Error, Label, Row } from "../../components/form";
import { getCandidateName } from "../../utils/kanban";
import CandidateAutocomplete from "./CandidateAutocomplete";

export const CandidateInput = ({ input, meta: { error } }) => {
  const autoInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    if (!isEditing) {
      onChange(null);
      setIsEditing(true);
      autoInput.current.focus();
    }
  };

  const onSelectCandidate = candidate => {
    onChange(candidate);
    setIsEditing(false);
  };

  const onChange = value => {
    const change = prop("onChange", input);
    if (change) change(value);
  };

  return (
    <Row>
      <Label label="Candidate" />
      <div onClick={onEdit}>
        <div style={{ height: 26 }}>
          <div style={{ position: "absolute" }}>
            <input value={getCandidateName(prop("value", input))} disabled />
          </div>
          <CandidateAutocomplete
            displayAuto={isEditing}
            autoInput={autoInput}
            onSelect={onSelectCandidate}
          />
        </div>
        {error && <Error error={error} />}
      </div>
    </Row>
  );
};

CandidateInput.propTypes = {
  error: string,
  input: object,
  meta: object
};

export default CandidateInput;
