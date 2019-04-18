import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { array, bool, func } from "prop-types";
import { getKanban } from "./kanban.actions";

const Kanban = ({ getKanban, kanban, loading }) => {
  useEffect(() => {
    getKanban();
  }, []);

  console.log(kanban);

  return (
    <div>
      {loading && <p>loading</p>}
      <p>Kanban</p>
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
