import React from 'react'
import PropTypes from 'prop-types'

import theme from '../../style/theme'

const TitleBackground = ({ color = theme.colors.black, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406 723" className={className}>
    <defs>
      <clipPath id="a">
        <path d="M0 0h406v723H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        d="M20 713c0 5.523-4.477 10-10 10s-10-4.477-10-10V18C0 8.059 8.059 0 18 0h370c9.941 0 18 8.059 18 18v83l-289.395-.003C52.202 102.868 20 144.536 20 226v487z"
        fillRule="evenodd"
        fill={color}
      />
    </g>
  </svg>
)

TitleBackground.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
}

export default TitleBackground
