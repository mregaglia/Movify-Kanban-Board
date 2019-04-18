import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { array, bool, func } from "prop-types";
import { getKanban } from "./kanban.actions";

const Kanban = ({ getKanban, kanban, loading }) => {
  useEffect(() => {
    getKanban();
  }, []);

  return (
    <div>
      {loading && <p>loading</p>}
      <p>Kanban</p>

      {kanban.map(bm => (
        <div key={bm.id}>
          <span>{`${bm.firstName} ${bm.lastName} `}</span>
          <p />
          {propOr([], "jobOrders", bm).map(jobOrder => (
            <div key={jobOrder.id}>
              <span>{`${jobOrder.clientCorporation.name} ${jobOrder.title} ${
                jobOrder.clientContact.firstName
              } ${jobOrder.clientContact.lastName} `}</span>
              <span>
                {propOr([], "jobSubmissions", jobOrder)
                  .map(
                    jobSubmission =>
                      `${jobSubmission.candidate.firstName} ${
                        jobSubmission.candidate.lastName
                      } `
                  )
                  .join(" - ")}
              </span>
            </div>
          ))}
          <br />
          <br />
        </div>
      ))}
    </div>
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
