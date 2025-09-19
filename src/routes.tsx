import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import FavoritePage from './views/FavoritePage'
import IndexPage from './views/IndexPage'
import Layout from './layouts/Layout'

export const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <Layout/> }>
                    <Route path='/' element={ <IndexPage /> } />
                    <Route path='/favoritos' element={ <FavoritePage /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}