import styled from 'styled-components/macro'

export const NotificationMessage = styled.div`
  height: calc(200% / 3);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  > img {
    width: 3rem;
    height: 3rem;
    border: none;
    margin: 0;
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    overflow: auto;
  }

  > * + * {
    margin-left: 1rem;
  }
`
