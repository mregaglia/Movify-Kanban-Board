import React from "react";
import { connect } from "react-redux";
import { path, pathOr, prop } from "ramda";
import { array, number, object, oneOfType, string } from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { getCandidateBorderColor } from "../../utils/kanban";
import LinkedinBadge from "../LinkedinBadge";
import { getHrColor } from "../../recruitment/HrLegend";
import Function from "./Function";

const Container = styled.div(({ borderColor, theme }) => ({
  display: "flex",
  backgroundColor: theme.colors.grey,
  borderRadius: theme.dimensions.borderRadius,
  borderBottomColor: path(["colors", borderColor], theme),
  borderBottomWidth: borderColor ? 4 : 0,
  borderBottomStyle: borderColor ? "solid" : "none",
  margin: 5,
  textOverflow: "ellipsis",
  overflow: "hidden",
  textAlign: "center"
}));

export const Text = styled.div(({ theme }) => ({
  display: "flex",
  flex: 1,
  alignSelf: "center",
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 4,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between"
});

const TextColumn = styled.div({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  textOverflow: "ellipsis",
  overflow: "hidden"
});

const Badge = styled.div(({ color }) => ({
  backgroundColor: color,
  height: 12,
  width: 12,
  borderRadius: 6,
  marginTop: 4,
  marginBottom: 4
}));

const getHrBadgeColor = (hrId, hrs) => {
  const index = hrs.findIndex(hr => prop("id", hr) === hrId);
  if (index >= 0) return getHrColor(index);
};

const CandidateCard = ({
  board,
  hrs,
  index,
  jobSubmissionId,
  jobSubmission
}) => (
  <Draggable draggableId={jobSubmissionId} index={index}>
    {provided => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        borderColor={getCandidateBorderColor(
          prop("dateLastModified", jobSubmission)
        )}
      >
        <TextColumn>
          <Text>
            {pathOr("", ["candidate", "firstName"], jobSubmission)}{" "}
            {pathOr("", ["candidate", "lastName"], jobSubmission)}
          </Text>
          {board === "recruitment" && (
            <Function
              board={board}
              functionTitle={path(
                ["candidate", "category", "name"],
                jobSubmission
              )}
              ccId={prop("clientCorporationId", jobSubmission)}
            />
          )}
        </TextColumn>
        <Column>
          <LinkedinBadge candidate={prop("candidate", jobSubmission)} />
          {board === "recruitment" && (
            <Badge
              color={getHrBadgeColor(
                path(["candidate", "owner", "id"], jobSubmission),
                hrs
              )}
            />
          )}
        </Column>
      </Container>
    )}
  </Draggable>
);

CandidateCard.propTypes = {
  board: string,
  candidate: object,
  hrs: array,
  index: number,
  jobSubmissionId: oneOfType([number, string]),
  jobSubmission: object
};

export default connect((state, { board, jobSubmissionId }) => ({
  jobSubmission: pathOr({}, [board, "jobSubmissions", jobSubmissionId], state),
  hrs: pathOr({}, ["recruitment", "hrs"], state)
}))(CandidateCard);
