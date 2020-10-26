import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object, string } from "prop-types";
import { ColorRowText, Column, Row } from "../components";
import JobOrder from "./JobOrder";

const ClientCorporation = ({ bmId, clientCorporation, color }) => (
  <div>
    <ColorRowText color={color}>
      {propOr("", "name", clientCorporation)}
    </ColorRowText>
    <Row style={{ paddingLeft: 4, paddingTop: 10, paddingBottom: 10 }}>
      <Column>
        {pathOr([], ["bmIds", bmId, "jobOrders"], clientCorporation).map(jobOrder => (
          <JobOrder key={prop("id", jobOrder)} joId={prop("id", jobOrder)} color={color} />
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
