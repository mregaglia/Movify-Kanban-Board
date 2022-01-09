import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bool } from 'prop-types'
import { path } from 'ramda'
import styled from 'styled-components'

import movifyLogo from '../assets/movify.png'

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20%',
})

const Img = styled.img({
  maxWidth: 500,
})

const Home = ({ authenticated, isCheckingAuth }) => {
  if (!isCheckingAuth && authenticated) return <Redirect to="/kanban" />
  if (!isCheckingAuth && authenticated === false) return <Redirect to="/login" />
  return (
    <Container>
      <Img alt="movify" src={movifyLogo} />
    </Container>
  )
}

Home.propTypes = {
  authenticated: bool,
  isCheckingAuth: bool,
}

export default connect((state) => ({
  authenticated: path(['auth', 'authenticated'], state),
  isCheckingAuth: path(['auth', 'isCheckingAuth'], state),
}))(Home)
