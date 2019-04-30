import React, { memo } from "react";
import { array } from "prop-types";
import CandidateCard from "./CandidateCard";

const Candidates = ({ jobSubmissions }) =>
  jobSubmissions.map((jobSubmissionId, index) => (
    <CandidateCard
      key={jobSubmissionId}
      jobSubmissionId={jobSubmissionId}
      index={index}
    />
  ));

Candidates.propTypes = {
  jobSubmissions: array
};

export default memo(Candidates);
