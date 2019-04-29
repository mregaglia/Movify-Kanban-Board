import React from "react";
import { pathOr, prop, propOr } from "ramda";
import { object, string } from "prop-types";
import { Column, Row, Text } from "./Kanban";
import ClientCorporation from "./ClientCorporation";

const Bm = ({ bm, color }) => (
  <Row style={{ marginBottom: 6 }}>
    <Text
      style={{
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: "50px",
        backgroundColor: color,
        textAlign: "center",
        fontSize: 16,
        paddingLeft: 4
      }}
    >
      {`${pathOr("", ["firstName", "0"], bm)}${pathOr(
        "",
        ["lastName", "0"],
        bm
      )}${pathOr("", ["lastName", "1"], bm)}`.toUpperCase()}
    </Text>

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
  color: string
};

export default Bm;
