import React, { useEffect } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { getRecruitment } from "./recruitment.actions";

const Recruitment = ({ getRecruitment }) => {
  useEffect(() => {
    getRecruitment();
  }, []);

  return <div>hello</div>;
};

Recruitment.propTypes = {
  getRecruitment: func
};

export default connect(
  null,
  { getRecruitment }
)(Recruitment);
