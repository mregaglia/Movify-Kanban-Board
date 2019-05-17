import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object, string } from "prop-types";
import { Text } from "./CandidateCard";

const DEFAULT_BOARD = "default";

const getDisplayFunction = client =>
  propOr("", "name", client)
    .toLowerCase()
    .includes("hipo");

const Function = ({ board, client, functionTitle }) => {
  if (board === DEFAULT_BOARD || getDisplayFunction(client))
    return <Text style={{ marginTop: 0 }}>{functionTitle}</Text>;

  return null;
};

Function.propTypes = {
  board: string,
  ccId: number,
  client: object,
  functionTitle: string
};

Function.defaultProps = {
  board: DEFAULT_BOARD
};

export default connect((state, { board, ccId }) => ({
  client: pathOr({}, [board, "clientCorporations", ccId], state)
}))(Function);
