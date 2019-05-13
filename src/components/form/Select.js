import React from "react";
import { func, object, string } from "prop-types";
import Row from "./Row";
import Label from "./Label";
import Error from "./Error";

export const Select = ({ input, label, meta: { error }, renderOptions }) => (
  <Row>
    <Label label={label} />
    <div>
      <select {...input}>{renderOptions()}</select>
      {error && <Error error={error} />}
    </div>
  </Row>
);

Select.propTypes = {
  error: string,
  input: object,
  label: string,
  meta: object,
  renderOptions: func
};

export default Select;
