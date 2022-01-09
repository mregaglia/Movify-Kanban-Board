import React from 'react'
import { number, object, string } from 'prop-types'

export const HourglassFull = ({ color, size, style }) => (
  <svg width={size} height={size} viewBox="0 0 40 69" xmlns="http://www.w3.org/2000/svg" style={style}>
    <g id="Hourglass-full" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Time-Copy-5" fill={color}>
        <path
          d="M40,4.7320891 C40,2.11862846 37.9336219,0 35.3846154,0 L4.61538462,0 C2.06637808,0 0,2.11862846 0,4.7320891 L0,18.9283564 C0.00265231344,20.2715942 0.561958554,21.5503851 1.53846154,22.445876 L14.8153846,34.7019868 L1.53846154,46.9580975 C0.561958554,47.8535884 0.00265231344,49.1323794 2.18628534e-14,50.4756171 L2.18628534e-14,64.6718844 C2.18628534e-14,67.2853451 2.06637808,69.4039735 4.61538462,69.4039735 L35.3846154,69.4039735 C37.9336219,69.4039735 40,67.2853451 40,64.6718844 L40,50.4756171 C39.9973477,49.1323794 39.4380414,47.8535884 38.4615385,46.9580975 L25.1846154,34.7019868 L38.4615385,22.445876 C39.4380414,21.5503851 39.9973477,20.2715942 40,18.9283564 L40,4.7320891 Z M35.3846154,7.38109573 L4.61538462,7.38109573 L4.61538462,4.7320891 L35.3846154,4.7320891 L35.3846154,7.38109573 Z"
          id="Shape"
        />
      </g>
    </g>
  </svg>
)

HourglassFull.propTypes = {
  color: string,
  size: number,
  style: object,
}

HourglassFull.defaultProps = {
  color: '#000',
  size: 24,
}

export default HourglassFull
