import styled, { css } from 'styled-components'

export const HotCandidateCompaniesContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  padding: 1rem 0 0 0;
`

export const HotCandidateCompany = styled.p`
  ${({ theme: { businessManagerColors }, owner }) => css`
    background-color: #d3d3d340;
    border-radius: 6px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    padding: 0.6rem;
    width: 70%;
    font-size: 0.875rem;
    line-height: 1.3;
    position: relative;
    ${owner && css`
      &::after {
        content: "";
        position: absolute;
        right: 2px;
        top: 2px;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: ${businessManagerColors[owner?.firstName?.toLowerCase()]};
      }
    `}
  `}
`
