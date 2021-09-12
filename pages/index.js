import React from 'react';
import styled from 'styled-components'

const Div = styled.div`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Home = () => {
  return (
    <h1>iniio da minha pagina</h1>
  )
}
export default Home;

