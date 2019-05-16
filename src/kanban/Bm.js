import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object, string } from "prop-types";
import { formatBmName } from "../utils/kanban";
import { ColorColumnText, Column, Row } from "../components";
import ClientCorporation from "./ClientCorporation";

const Bm = ({ bm, color }) => (
  <Row style={{ marginBottom: 6 }}>
    <ColorColumnText color={color}>{formatBmName(bm || {})}</ColorColumnText>
    <Column>
      {propOr([], "clientCorporations", bm).map(ccId => (
        <ClientCorporation
          key={`${prop("id", bm)}.${ccId}`}
          bmId={prop("id", bm)}
          ccId={ccId}
          color={color}
        />
      ))}
    </Column>
  </Row>
);

Bm.propTypes = {
  bm: object,
  bmId: number,
  color: string
};

export default connect((state, { bmId }) => ({
  bm: pathOr({}, ["kanban", "bms", bmId], state)
}))(Bm);
