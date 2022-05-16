import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header/index.jsx'

import AppRouter from './Routes.jsx'

function App() {
  return (
    <BrowserRouter>
    <Header />
    <AppRouter />
    </BrowserRouter>
  )
}

export default App
