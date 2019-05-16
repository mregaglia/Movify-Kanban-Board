import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import styled from "styled-components";
import { number, object, string } from "prop-types";
import { RECRUITMENT_STATUSES } from "../utils/kanban";
import { ColorRowText } from "../components";
import Board from "../components/board/Board";

const Container = styled.div({
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 24
});

const JobOrder = ({ jobOrder, color }) => (
  <div>
    <ColorRowText color={color}>{`${prop("title", jobOrder)} – ${prop(
      "id",
      jobOrder
    )}`}</ColorRowText>
    <Container>
      <Board
        board="recruitment"
        jobSubmissions={prop("jobSubmissions", jobOrder)}
        statuses={RECRUITMENT_STATUSES}
        jobOrderId={prop("id", jobOrder)}
      />
    </Container>
  </div>
);

JobOrder.propTypes = {
  color: string,
  jobOrder: object,
  joId: number
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["recruitment", "jobOrders", joId], state)
}))(JobOrder);
