import React from "react";
import { object } from "prop-types";
import styled from "styled-components";
import { getBullhornUrl } from "../utils/bullhorn";

const Badge = styled.div(({ theme }) => ({
    cursor: "pointer",
    backgroundColor: theme.colors.bullhorn,
    height: 20,
    width: 20,
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderBottomRightRadius: theme.dimensions.borderRadius
}));

const Img = styled.img({
    height: 12,
    width: 12,
    display: "inline-block",
    padding: 4
});

const BullhornBadge = ({ candidate }) => (
    <Badge onClick={() => window.open(getBullhornUrl(candidate), "_blank")}>
        <Img alt="bh" src={require("../assets/bullhorn.png")} />
    </Badge>
);

BullhornBadge.propTypes = {
    candidate: object
};

export default BullhornBadge;
