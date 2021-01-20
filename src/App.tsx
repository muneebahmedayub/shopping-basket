import React, { useState } from 'react';
import './App.css';
import { Container, useMediaQuery, useTheme } from '@material-ui/core'

import Products from './components/Products'
import Basket from './components/Basket'
import Header from './components/Header'


function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const theme = useTheme()
  const smallUp = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <div className="App">
      <Header setModalOpen={setModalOpen} />
      <Container>
        {smallUp ?
          (
            <>
              <Products />
              <Basket modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </>
          )
          :
          (
            modalOpen ?
            (
              <Basket modalOpen={modalOpen} setModalOpen={setModalOpen} />
            )
            :
            (
              <Products />
            )
          )
        }
      </Container>
    </div>
  );
}

export default App;
