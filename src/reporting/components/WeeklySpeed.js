import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";

const Paragraph = styled.p`
  font-size: 35px;
`

const WeeklySpeed = () => {
    return (
        <div>
           <Paragraph>Weekly Speed : </Paragraph>
        </div >
    )
}

WeeklySpeed.propTypes = {

};

export default connect(
    state => ({

    }),
    {  }
)(WeeklySpeed);