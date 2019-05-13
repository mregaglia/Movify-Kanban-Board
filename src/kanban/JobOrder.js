import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import PriorityBadge from "../components/PriorityBadge";
import { Row, Text } from "./Kanban";
import Board from "./board/Board";

const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "16%"
});

const Title = styled.div(({ theme }) => ({
  display: "flex",
  flex: 1,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  paddingTop: 12,
  paddingRight: 4,
  paddingLeft: 12,
  paddingBottom: 12,
  marginTop: 4,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Tooltip = styled(ReactTooltip)`
  font-family: ${({ theme }) => theme.fonts.fontFamily};
  font-size: ${({ theme }) => `${theme.textDimensions.regular}px !important`};
  background-color: ${({ theme }) =>
    `${theme.colors.tooltipShadow} !important`};

  &.place-right {
    &:after {
      border-right-color: ${({ theme }) =>
        `${theme.colors.tooltipShadow} !important`};
      border-right-style: solid !important;
      border-right-width: 6px !important;
    }
  }
`;

const JobOrder = ({ jobOrder }) => (
  <Row>
    <Column>
      <Row>
        <Title data-tip={prop("description", jobOrder)}>
          {propOr("", "title", jobOrder)}
        </Title>
        <PriorityBadge priority={prop("employmentType", jobOrder)} />
        <Tooltip className="jobDescription" place="right" html effect="solid" />
      </Row>
      <Text>
        {`${pathOr("", ["clientContact", "firstName"], jobOrder)} ${pathOr(
          "",
          ["clientContact", "lastName"],
          jobOrder
        )} `}
      </Text>
    </Column>
    <Board
      bmId={prop("bmId", jobOrder)}
      clientCorporationId={prop("clientCorporationId", jobOrder)}
      jobOrderId={prop("id", jobOrder)}
    />
  </Row>
);

JobOrder.propTypes = {
  joId: number,
  jobOrder: object
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["kanban", "jobOrders", joId], state)
}))(JobOrder);
