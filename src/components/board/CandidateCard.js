import React, { useState } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop } from "ramda";
import { array, func, number, object, oneOfType, string } from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ContextMenuTrigger } from "react-contextmenu";
import { deleteJobSubmission } from "../../kanban/kanban.actions";
import { deleteJobSubmission as deleteRecJobSubmission } from "../../recruitment/recruitment.actions";
import { getCandidateBorderColor } from "../../utils/kanban";
import LinkedinBadge from "../LinkedinBadge";
import { getHrColor } from "../../recruitment/HrLegend";
import Function from "./Function";
import CandidateMenu from "./CandidateMenu";
import ConfirmationModal from "../ConfirmationModal";

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
  deleteJobSubmission,
  deleteRecJobSubmission,
  hrs,
  index,
  jobSubmissionId,
  jobSubmission
}) => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const onClose = () => setDisplayDeleteModal(false);

  const onDelete = () => {
    if (board === "kanban") deleteJobSubmission(jobSubmission);
    if (board === "recruitment") deleteRecJobSubmission(jobSubmission);
    setDisplayDeleteModal(false);
  };

  return (
    <Draggable draggableId={jobSubmissionId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ContextMenuTrigger id={`${jobSubmissionId}`}>
            <Container
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
          </ContextMenuTrigger>
          <CandidateMenu
            id={jobSubmissionId}
            onDelete={() => setDisplayDeleteModal(true)}
          />
          <ConfirmationModal
            isOpen={displayDeleteModal}
            onClose={onClose}
            onConfirm={onDelete}
            title={`Candidate ${pathOr(
              "",
              ["candidate", "firstName"],
              jobSubmission
            )} ${pathOr("", ["candidate", "lastName"], jobSubmission)}`}
            text={`Do you want to delete this candidate for the vacancy ${pathOr(
              "",
              ["jobOrder", "title"],
              jobSubmission
            )}?`}
          />
        </div>
      )}
    </Draggable>
  );
};

CandidateCard.propTypes = {
  board: string,
  candidate: object,
  deleteJobSubmission: func,
  deleteRecJobSubmission: func,
  hrs: array,
  index: number,
  jobSubmissionId: oneOfType([number, string]),
  jobSubmission: object
};

export default connect(
  (state, { board, jobSubmissionId }) => ({
    jobSubmission: pathOr(
      {},
      [board, "jobSubmissions", jobSubmissionId],
      state
    ),
    hrs: pathOr({}, ["recruitment", "hrs"], state)
  }),
  { deleteJobSubmission, deleteRecJobSubmission }
)(CandidateCard);
