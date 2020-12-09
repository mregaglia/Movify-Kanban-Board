import React from "react";
import { string } from "prop-types";
import styled from "styled-components";
import { getLinkedinUrl } from "../../utils/linkedin";

const Text = styled.div(({ theme }) => ({
    display: "inline-block",
    fontFamily: theme.fonts.fontFamily,
    fontSize: theme.textDimensions.small,
    fontWeight: 600,
    color: "white",
    padding: 4
}));

const SquareContainer = styled.div(({ theme }) => ({
    cursor: "pointer",
    backgroundColor: theme.colors.linkedin,
    height: 20,
    width: 20,
    borderRadius: theme.dimensions.borderRadius,
    marginLeft: 4,
    marginRight: 4
}));

const LinkContainer = styled.a({
    color: "transparent",
    textDecoration: "none"
})

const LinkedinLink = ({ firstName, lastName }) => (

    <LinkContainer href={getLinkedinUrl({ firstName, lastName })} target="_blank" rel="noopener noreferrer">
        <SquareContainer>
            <Text>in</Text>
        </SquareContainer>
    </LinkContainer >
);

LinkedinLink.propTypes = {
    firstName: string,
    lastName: string
};

export default LinkedinLink;
