import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import { array, bool, func } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import theme from "../style/theme";
import { getRecruitment } from "./recruitment.actions";
import { Title } from "../components";
import ClientCorporation from "./ClientCorporation";
import HrLegend from "./HrLegend";

const getPipeColor = index => theme.pipeColors[index % theme.pipeColors.length];

const Recruitment = ({ clientList, getRecruitment, loading }) => {
  useEffect(() => {
    if (!prop("length", clientList)) getRecruitment();
  }, []);

  const onDnd = () => {};

  if (loading)
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    );

  return (
    <div>
      <HrLegend />
      <DragDropContext onDragEnd={onDnd}>
        {clientList.map((client, index) => (
          <ClientCorporation
            key={client}
            clientId={client}
            color={getPipeColor(index)}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

Recruitment.propTypes = {
  clientList: array,
  getRecruitment: func,
  loading: bool
};

export default connect(
  state => ({
    clientList: pathOr([], ["recruitment", "clientList"], state),
    loading: pathOr(true, ["recruitment", "loading"], state)
  }),
  { getRecruitment }
)(Recruitment);
