import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { func, object } from 'prop-types'
import { pathOr } from 'ramda'
import styled from 'styled-components'

import Loader from '../components/Loader'

import { authorize, login } from './auth.actions'
import { getAuthorizeUrl, getCode } from './auth.service'
import LoginForm from './Login.form'

const Button = styled.button(({ disabled, theme }) => ({
  display: 'inline-block',
  padding: 16,
  marginLeft: '10%',
  marginTop: 10,
  borderWidth: 0,
  borderRadius: theme.dimensions.borderRadius,
  backgroundColor: disabled ? theme.colors.lightRed : theme.colors.red,
  color: theme.colors.darkWhite,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.xlarge,
  textDecoration: 'none',
  cursor: disabled ? 'default' : 'pointer',
}))

const Welcome = styled.div(({ theme }) => ({
  marginTop: '10%',
  marginBottom: 60,
  marginLeft: '10%',
  color: theme.colors.red,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.big,
}))

const Login = ({ authorize: authorizeProp, login: loginProp, auth, location }) => {
  useEffect(() => {
    const code = getCode(window.location.href)
    if (code.length > 0) loginProp(code)
  }, [loginProp])

  if (auth.authenticated) return <Redirect to={pathOr('/', ['state', 'from', 'pathname'], location)} />

  const isLoading = auth.loading || auth.isCheckingAuth

  return (
    <div>
      <Welcome>Welcome to Movify Kanban Board !</Welcome>
      <LoginForm isLoading={isLoading} onSubmit={authorizeProp} />
      <a href={getAuthorizeUrl()}>
        <Button disabled={isLoading}>
          Sign in with Bullhorn
          {isLoading && <Loader style={{ marginLeft: 16 }} />}
        </Button>
      </a>
    </div>
  )
}

Login.propTypes = {
  auth: object,
  authorize: func,
  login: func,
  location: object,
}

export default connect((state) => ({ auth: state.auth }), { authorize, login })(Login)
