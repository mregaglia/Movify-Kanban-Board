
const getColorGaugeLimit = (colorLimit, limitMax) => {
    return Math.round(((colorLimit/limitMax) + Number.EPSILON) * 100) / 100
}