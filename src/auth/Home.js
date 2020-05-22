import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { path } from "ramda";
import { bool, func } from "prop-types";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20%"
});

const Img = styled.img({
  maxWidth: 500
});

const Home = ({ authenticated, isCheckingAuth }) => {
  if (!isCheckingAuth && authenticated) return <Redirect to="/kanban" />;
  else if (!isCheckingAuth && authenticated === false)
    return <Redirect to="/login" />;
  else
    return (
      <Container>
        <Img alt="movify" src={require("../assets/movify.png")} />
      </Container>
    );
};

Home.propTypes = {
  authenticated: bool,
  checkAuth: func,
  isCheckingAuth: bool
};

export default connect(state => ({
  authenticated: path(["auth", "authenticated"], state),
  isCheckingAuth: path(["auth", "isCheckingAuth"], state)
}))(Home);
