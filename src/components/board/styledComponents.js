import styled, { css } from 'styled-components'

export const HotCandidateCompaniesContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  padding: 1rem 0 1rem 0;
`

export const HotCandidateCompany = styled.p`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.grey};
    border-radius: 6px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    padding: 0.6rem;
    width: 70%;
    font-size: 0.875rem;
    line-height: 1.3;
  `}
`
