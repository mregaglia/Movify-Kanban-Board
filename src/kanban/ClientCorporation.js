import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object, string } from "prop-types";
import styled from "styled-components";
import { Column, Row } from "./Kanban";
import JobOrder from "./JobOrder";

export const Text = styled.div(({ color, theme }) => ({
  display: "inline-block",
  width: "100%",
  backgroundColor: `${color}50`,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden",
  paddingLeft: 16
}));

const ClientCorporation = ({ bmId, clientCorporation, color }) => (
  <div>
    <Text color={color}>{propOr("", "name", clientCorporation)}</Text>
    <Row style={{ paddingLeft: 4, paddingTop: 10, paddingBottom: 10 }}>
      <Column>
        {pathOr([], ["bmIds", bmId], clientCorporation).map(joId => (
          <JobOrder key={joId} joId={joId} />
        ))}
      </Column>
    </Row>
  </div>
);

ClientCorporation.propTypes = {
  bmId: number,
  ccId: number,
  clientCorporation: object,
  color: string
};

export default connect((state, { ccId }) => ({
  clientCorporation: pathOr({}, ["kanban", "clientCorporations", ccId], state)
}))(ClientCorporation);
