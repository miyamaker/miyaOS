import styled from 'styled-components/macro'

const Symba = styled.div`
  border-color: white;
  color: white;
  background-color: #333;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  /* padding: 4px; */

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  height: 24px;
  width: 24px;
  margin: 0 8px 0 0;
`

const Img = styled.img`
  border-color: white;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  color: white;

  height: 24px;
  width: 24px;
  margin: 0 8px 0 0;
`

export default function TokenImage({ src, name }: { src?: string; name?: string }) {
  if (!name) return null
  return src ? <Img src={src} alt="token logo" /> : <Symba>{name.length >= 2 ? name.slice(0, 2) : name}</Symba>
}
