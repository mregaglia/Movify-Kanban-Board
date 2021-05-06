const hexToRGB = (hex) => {
  let clean = hex
  if (clean.includes("#")) {
    clean = hex.split("#")[1]
  }

  if (clean.length !== 6) {
    throw new Error("Only six-digit hex colors are allowed.")
  }

  const aRgbHex = clean.match(/.{1,2}/g)
  const rgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)]
  return rgb
}

export default hexToRGB
