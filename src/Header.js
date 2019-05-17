import React from "react";
import { connect } from "react-redux";
import { path } from "ramda";
import { Link, Route } from "react-router-dom";
import { bool, object, string } from "prop-types";
import styled from "styled-components";

const Container = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.lightGrey,
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}));

const Img = styled.img({
  height: 90,
  width: 90,
  marginLeft: 20,
  marginRight: "5%"
});

const StyledLink = styled(Link)`
    font-family: ${({ theme }) => theme.fonts.fontFamily};
    font-size: ${({ theme }) => `${theme.textDimensions.regular}px`};
    text-transform: uppercase;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom-color: ${({ theme }) => theme.colors.red}
    border-bottom-width: 3px
    border-bottom-style: ${({ isactive }) => (isactive ? "solid" : "none")}
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black}

    &:hover {
        border-bottom-style: solid;
    }
`;

const HeaderLink = ({ label, to }) => (
  <Route
    path={to}
    exact
    children={({ match }) => (
      <StyledLink isactive={match ? match : undefined} to={to}>
        {label}
      </StyledLink>
    )}
  />
);

HeaderLink.propTypes = {
  label: string,
  match: object,
  to: string
};

const Header = ({ authenticated }) => {
  if (!authenticated) return null;
  else
    return (
      <Container>
        <Img alt="movify" src={require("./assets/movify.png")} />
        <nav>
          <HeaderLink label="Business" to="/kanban" />
          <HeaderLink label="Recruitment" to="/recruitment" />
        </nav>
      </Container>
    );
};

Header.propTypes = {
  authenticated: bool
};

export default connect(state => ({
  authenticated: path(["auth", "authenticated"], state)
}))(Header);