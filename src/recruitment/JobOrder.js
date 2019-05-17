import React, { useState } from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import styled from "styled-components";
import { number, object, string } from "prop-types";
import { RECRUITMENT_STATUSES } from "../utils/kanban";
import { ColorRowText } from "../components";
import { Add } from "../components/svgs";
import Board from "../components/board/Board";

const Container = styled.div({
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 24
});

const AddButton = styled.div(({ color, theme }) => ({
  alignSelf: "center",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: theme.colors.darkWhite,
  color: color,
  height: 30,
  width: 30,
  borderRadius: 15,
  marginRight: 8,
  marginLeft: 16
}));

const JobOrder = ({ jobOrder, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ColorRowText color={color}>
        {`${prop("title", jobOrder)} – ${prop("id", jobOrder)}`}
        <AddButton color={color} onClick={() => setIsModalOpen(true)}>
          <Add color={color} style={{ paddingTop: 3, paddingLeft: 0.5 }} />
        </AddButton>
      </ColorRowText>
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
};

JobOrder.propTypes = {
  color: string,
  jobOrder: object,
  joId: number
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["recruitment", "jobOrders", joId], state)
}))(JobOrder);
