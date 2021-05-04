const getMapValue = (map, key, fallback = "other") => map.get(key) ?? fallback

export default getMapValue
