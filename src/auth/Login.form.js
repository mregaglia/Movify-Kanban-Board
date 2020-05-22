import React from "react";
import { Field, reduxForm } from "redux-form";
import { bool, func } from "prop-types";
import styled from "styled-components";
import Loader from "../components/Loader";
import { isRequired } from "../utils/validate";

const Button = styled.button(({ disabled, theme }) => ({
    display: "inline-block",
    padding: 16,
    marginLeft: "10%",
    marginTop: 10,
    borderWidth: 0,
    borderRadius: theme.dimensions.borderRadius,
    backgroundColor: disabled ? theme.colors.lightRed : theme.colors.red,
    color: theme.colors.darkWhite,
    fontFamily: theme.fonts.fontFamily,
    fontSize: theme.textDimensions.xlarge,
    textDecoration: "none",
    cursor: disabled ? "default" : "pointer"
}));

const Cell = styled.div({
    flex: 1,
    marginLeft: "10%",
    marginBottom: 15
});

const Label = styled.div(({ theme }) => ({
    color: theme.colors.red,
    fontFamily: theme.fonts.fontFamily,
    fontSize: theme.textDimensions.regular,
    marginBottom: 5,
    marginTop: 10,
    flex: 1
}));

const LoginForm = ({ handleSubmit, isLoading, valid }) => (
    <form onSubmit={handleSubmit}>
        <Cell>
            <Label>Username</Label>
            <Field
                name="username"
                component="input"
                type="text"
                validate={isRequired} />
        </Cell>
        <Cell>
            <Label>Password</Label>
            <Field
                name="password"
                component="input"
                type="password"
                validate={isRequired} />
        </Cell>
        <Button disabled={isLoading || !valid} type="submit">
            Log in with Bullhorn
                {isLoading && <Loader style={{ marginLeft: 16 }} />}
        </Button>
    </form>
);

LoginForm.propTypes = {
    handleSubmit: func,
    isLoading: bool,
    valid: bool
};

LoginForm.defaultProps = {
    isLoading: false,
    valid: false
}

export default reduxForm({
    form: "login"
})(LoginForm);