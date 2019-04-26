import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object } from "prop-types";
import { Column, Row, Text } from "./Kanban";
import JobOrder from "./JobOrder";

const ClientCorporation = ({ bmId, clientCorporation }) => (
  <Row>
    <Text style={{ width: "70px" }}>
      {propOr("", "name", clientCorporation)}
    </Text>
    <Column>
      {pathOr([], ["bmIds", bmId], clientCorporation).map(joId => (
        <JobOrder key={joId} joId={joId} />
      ))}
    </Column>
  </Row>
);

ClientCorporation.propTypes = {
  bmId: number,
  ccId: number,
  clientCorporation: object
};

export default connect((state, { ccId }) => ({
  clientCorporation: pathOr({}, ["kanban", "clientCorporations", ccId], state)
}))(ClientCorporation);
