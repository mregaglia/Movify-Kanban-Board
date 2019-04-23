import { propOr } from "ramda";

export const STATUS_ITV1 = "ITV1";
export const STATUS_ITV2 = "ITV2";
export const STATUS_TO_SEND = "To Send";
export const STATUS_WF_RESPONSE = "CV Sent";
export const STATUS_INTAKE = "INTAKE";
export const STATUS_WF_FEEDBACK = "WFF";

const AVAILABLE_STATUSES = [
  STATUS_ITV1,
  STATUS_ITV2,
  STATUS_TO_SEND,
  STATUS_WF_RESPONSE,
  STATUS_INTAKE,
  STATUS_WF_FEEDBACK
];

export const formatJobSubmissions = jobSubmissions =>
  jobSubmissions.reduce((acc, jobSubmission) => {
    if (AVAILABLE_STATUSES.includes(jobSubmission.status)) {
      const submissions = propOr([], jobSubmission.status, acc);
      submissions.push(jobSubmission);
      acc[jobSubmission.status] = submissions;
    } else {
      const submissions = propOr([], "OTHER", acc);
      submissions.push(jobSubmission);
      acc["OTHER"] = submissions;
    }
    return acc;
  }, {});
