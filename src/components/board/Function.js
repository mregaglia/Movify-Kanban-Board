import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object, string } from "prop-types";
import { Text } from "./CandidateCard";

const getDisplayFunction = client =>
  propOr("", "name", client)
    .toLowerCase()
    .includes("hipo");

const Function = ({ client, functionTitle }) => {
  if (getDisplayFunction(client))
    return <Text style={{ marginTop: 0 }}>{functionTitle}</Text>;

  return null;
};

Function.propTypes = {
  board: string,
  ccId: number,
  client: object,
  functionTitle: string
};

export default connect((state, { board, ccId }) => ({
  client: pathOr({}, [board, "clientCorporations", ccId], state)
}))(Function);
