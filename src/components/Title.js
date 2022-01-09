import styled from 'styled-components'

import { Text } from './Text'

export const Title = styled(Text)(({ theme }) => ({
  fontSize: theme.textDimensions.bigTitle,
  marginBottom: 20,
}))

export default Title
