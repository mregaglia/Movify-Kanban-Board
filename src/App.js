import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { func } from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { checkAuth } from './auth/auth.actions'
import theme from './style/theme'
import { setBaseUrl, setToken } from './utils/api'
import { getBaseUrl, getToken } from './utils/storage'
import Routes from './Routes'

const App = ({ checkAuth: checkAuthProp }) => {
  useEffect(() => {
    Modal.setAppElement('body')

    const token = getToken()
    const baseUrl = getBaseUrl()
    if (token) setToken(token)
    if (baseUrl) setBaseUrl(baseUrl)

    checkAuthProp()
  }, [checkAuthProp])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Router>
  )
}

App.propTypes = {
  checkAuth: func,
}

export default connect(null, { checkAuth })(App)
