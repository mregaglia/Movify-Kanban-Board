import React from "react";
import { pathOr, prop, propOr } from "ramda";
import { object } from "prop-types";
import { Row, Text } from "./Kanban";
import ClientCorporation from "./ClientCorporation";

const Bm = ({ bm }) => (
  <Row>
    <Text>{`${pathOr("", ["firstName", "0"], bm)}${pathOr(
      "",
      ["lastName", "0"],
      bm
    )} `}</Text>

    <div>
      {propOr([], "clientCorporations", bm).map(ccId => (
        <ClientCorporation
          key={`${prop("id", bm)}.${ccId}`}
          bmId={prop("id", bm)}
          ccId={ccId}
        />
      ))}
    </div>
  </Row>
);

Bm.propTypes = {
  bm: object
};

export default Bm;
