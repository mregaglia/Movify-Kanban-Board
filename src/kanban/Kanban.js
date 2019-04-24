import React, { useEffect } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop, propOr } from "ramda";
import { array, bool, func } from "prop-types";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { getKanban } from "./kanban.actions";
import Board from "./board/Board";

const Container = styled.div({
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 20,
  paddingBottom: 20
});

const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: 14
}));

const Title = styled(Text)({
  fontSize: 32,
  marginBottom: 20
});

const TD = styled.td({
  textAlign: "center"
});

const getColumnData = droppableId => {
  const splits = droppableId.split(".");
  return { jobOrderId: prop("0", splits), status: prop("1", splits) };
};

const Kanban = ({ getKanban, kanban, loading }) => {
  useEffect(() => {
    getKanban();
  }, []);

  const onDnd = result => {
    const jobSubmissionId = prop("draggableId", result);
    const src = getColumnData(path(["source", "droppableId"], result));
    const dest = getColumnData(path(["destination", "droppableId"], result));
    if (src.jobOrderId === dest.jobOrderId && src.status !== dest.status) {
      console.log("onDnd", jobSubmissionId, src, dest);
    }
  };

  if (loading)
    return (
      <Container>
        <Title>Loading ...</Title>
      </Container>
    );

  return (
    <Container>
      <Title>Kanban Board</Title>

      <DragDropContext onDragEnd={onDnd}>
        <table>
          <thead>
            <tr>
              <th>
                <Text>BM</Text>
              </th>
              <th>
                <Text>Client</Text>
              </th>
              <th>
                <Text>Position</Text>
              </th>
              <th>
                <Text>Process</Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {kanban.map(bm =>
              propOr([], "clientCorporations", bm).map(
                (clientCorporation, indexCC) =>
                  propOr([], "jobOrders", clientCorporation).map(
                    (jobOrder, indexJO) => (
                      <tr key={jobOrder.id}>
                        <TD>
                          <Text>
                            {indexCC === 0 &&
                              indexJO === 0 &&
                              `${pathOr("", ["firstName", "0"], bm)}${pathOr(
                                "",
                                ["lastName", "0"],
                                bm
                              )} `}
                          </Text>
                        </TD>
                        <TD>
                          <Text>{indexJO === 0 && clientCorporation.name}</Text>
                        </TD>
                        <TD>
                          <Text>{jobOrder.title}</Text>
                          <br />
                          <Text>
                            {`${jobOrder.clientContact.firstName} ${
                              jobOrder.clientContact.lastName
                            } `}
                          </Text>
                        </TD>
                        <TD>{<Board jobOrder={jobOrder} />}</TD>
                      </tr>
                    )
                  )
              )
            )}
          </tbody>
        </table>
      </DragDropContext>
    </Container>
  );
};

Kanban.propTypes = {
  getKanban: func,
  kanban: array,
  loading: bool
};

export default connect(
  state => ({
    kanban: pathOr([], ["kanban", "kanban"], state),
    loading: pathOr([], ["kanban", "loading"], state)
  }),
  { getKanban }
)(Kanban);
