import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object } from "prop-types";
import { Column, Row, Text } from "./Kanban";
import JobOrder from "./JobOrder";

const ClientCorporation = ({ bmId, clientCorporation }) => (
  <div>
    <Text style={{ width: 110, fontSize: 16, fontWeight: 600 }}>
      {propOr("", "name", clientCorporation)}
    </Text>
    <Row style={{ paddingLeft: 10, paddingBottom: 10 }}>
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
  clientCorporation: object
};

export default connect((state, { ccId }) => ({
  clientCorporation: pathOr({}, ["kanban", "clientCorporations", ccId], state)
}))(ClientCorporation);