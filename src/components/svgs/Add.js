import React from 'react'
import { number, object, string } from 'prop-types'

export const Add = ({ color, size, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

Add.propTypes = {
  color: string,
  size: number,
  style: object,
}

Add.defaultProps = {
  color: '#000',
  size: 24,
}

export default Add
