import React from "react";
import { func, object, string } from "prop-types";
import styled from "styled-components";
import Row from "./Row";
import Label from "./Label";
import Error from "./Error";

const StyledSelect = styled.select(({ theme }) => ({
  padding: 4,
  borderColor: theme.colors.mediumGrey,
  borderWidth: 1,
  borderStyle: "solid",
  width: 210
}));

export const Select = ({ input, label, meta: { error }, renderOptions }) => (
  <Row>
    <Label label={label} />
    <div>
      <StyledSelect {...input}>{renderOptions()}</StyledSelect>
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
