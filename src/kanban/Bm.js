import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object, string } from "prop-types";
import styled from "styled-components";
import { Column, Row } from "./Kanban";
import ClientCorporation from "./ClientCorporation";

export const Text = styled.div(({ color, theme }) => ({
  display: "inline-block",
  width: "50px",
  backgroundColor: color,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: "center",
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden",
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  paddingLeft: 4
}));

const Bm = ({ bm, color }) => (
  <Row style={{ marginBottom: 6 }}>
    <Text color={color}>
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
  bmId: number,
  color: string
};

export default connect((state, { bmId }) => ({
  bm: pathOr({}, ["kanban", "bms", bmId], state)
}))(Bm);
