import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { array, bool, func } from "prop-types";
import styled from "styled-components";
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

const Kanban = ({ getKanban, kanban, loading }) => {
  useEffect(() => {
    getKanban();
  }, []);

  if (loading)
    return (
      <Container>
        <Title>Loading ...</Title>
      </Container>
    );

  return (
    <Container>
      <Title>Kanban Board</Title>

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
              <Text>Client contact</Text>
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
                            `${bm.firstName} ${bm.lastName} `}
                        </Text>
                      </TD>
                      <TD>
                        <Text>{indexJO === 0 && clientCorporation.name}</Text>
                      </TD>
                      <TD>
                        <Text>{indexJO === 0 && jobOrder.title}</Text>
                      </TD>
                      <TD>
                        <Text>
                          {indexJO === 0 &&
                            `${jobOrder.clientContact.firstName} ${
                              jobOrder.clientContact.lastName
                            } `}
                        </Text>
                      </TD>
                      <TD>
                        {
                          <Board
                            jobSubmissions={propOr(
                              {},
                              "jobSubmissions",
                              jobOrder
                            )}
                          />
                        }
                      </TD>
                    </tr>
                  )
                )
            )
          )}
        </tbody>
      </table>
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
