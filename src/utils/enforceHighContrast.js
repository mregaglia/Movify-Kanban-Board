import hexToRGB from "./hexToRGB"
import theme from "../style/theme"

// Enforces text with a background to always pick the color for the best contrast
const enforceHightContrast = (hex) => {
  const rgb = hexToRGB(hex)
  const sum = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
  return (sum > 128) ? theme.colors.black : theme.colors.white;
}

export default enforceHightContrast
