import React from "react";
import { number } from "prop-types";
import styled from "styled-components";
import { getBullhornUrl } from "../../utils/bullhorn";

const Img = styled.img({
    height: 12,
    width: 12,
    display: "inline-block",
    padding: 4
});

const SquareContainer = styled.div(({ theme }) => ({
    cursor: "pointer",
    backgroundColor: theme.colors.bullhorn,
    height: 20,
    width: 20,
    borderRadius: theme.dimensions.borderRadius,
    marginRight: 4,
    marginLeft: 4
}));

const LinkContainer = styled.a({
    color: "transparent",
    textDecoration: "none"
})

const BullhornLink = ({ candidateId, isClient }) => (
    
    <LinkContainer href={getBullhornUrl({ id: candidateId })} target="_blank" rel="noopener noreferrer">
        <SquareContainer>
            <Img alt="bh" src={require("../../assets/bullhorn.png")} />
        </SquareContainer>
    </LinkContainer >
);

BullhornLink.propTypes = {
    candidateId: number
};

export default BullhornLink;
