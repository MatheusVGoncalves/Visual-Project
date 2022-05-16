import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Canva from './pages/Canva';
import Home from './pages/Home';
import Orientacao from './pages/Orientacao';


function AppRouter () {
    return(
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/canva' element={<Canva />} /> 
            <Route path='/orientacao' element={<Orientacao />} /> 
        </Routes>
    )
}

export default AppRouter;