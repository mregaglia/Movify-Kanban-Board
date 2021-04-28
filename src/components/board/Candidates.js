import React from "react";
import { array, string } from "prop-types";
import CandidateCard from "./CandidateCard";

const Candidates = ({ board, jobSubmissions }) =>
  jobSubmissions.map((jobSubmissionId, index) => (
    <CandidateCard
      board={board}
      key={jobSubmissionId}
      jobSubmissionId={jobSubmissionId}
      index={index}
    />
  ));

Candidates.propTypes = {
  board: string,
  jobSubmissions: array
};

export default Candidates;
