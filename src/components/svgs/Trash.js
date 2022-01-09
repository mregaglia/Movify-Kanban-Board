import React from 'react'
import { number, object, string } from 'prop-types'

export const Trash = ({ color, size, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill={color} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

Trash.propTypes = {
  color: string,
  size: number,
  style: object,
}

Trash.defaultProps = {
  color: '#000',
  size: 24,
}

export default Trash
