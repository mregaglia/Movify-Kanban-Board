import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object } from "prop-types";
import { Row, Text } from "./Kanban";
import JobOrder from "./JobOrder";

const ClientCorporation = ({ bmId, clientCorporation }) => (
  <Row>
    <Text>{propOr("", "name", clientCorporation)}</Text>
    <div>
      {pathOr([], ["bmIds", bmId], clientCorporation).map(joId => (
        <JobOrder key={joId} joId={joId} />
      ))}
    </div>
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
